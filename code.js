function button_pressed_with_value(value_to_add: number) {
    if (interface_mode == interface_mode_change_leds) {
        change_leds_by(value_to_add)
        radio.sendValue("led_num", value_to_add)
    } else if (interface_mode == interface_mode_change_dynamic) {
        change_dynamic_by(value_to_add)
        radio.sendValue("mode", value_to_add)
    } else if (interface_mode == interface_mode_change_color) {
        change_colour_by(value_to_add)
        radio.sendValue("color", value_to_add)
    } else if (interface_mode == interface_mode_change_brightness) {
        change_brightness_by(value_to_add)
        radio.sendValue("bright", value_to_add)
    }
}
function change_leds_by(change_led_by_index: number) {
    leds_to_use += change_led_by_index
    if (leds_to_use >= 60) {
        leds_to_use = 60
    } else if (leds_to_use < 0) {
        leds_to_use = 0
    }
    if (this_is_a_controller == true) {
        led.plotBarGraph(
            leds_to_use,
            60
        )
    } else {
        basic.clearScreen()
    }
}
function change_dynamic_by(change_mode_by_index: number) {
    dynamic_to_use_index += change_mode_by_index
    if (dynamic_to_use_index >= dynamic_array.length) {
        dynamic_to_use_index = 0
    } else if (dynamic_to_use_index < 0) {
        dynamic_to_use_index = dynamic_array.length - 1
    }
    dynamic_to_use = dynamic_array[dynamic_to_use_index]
    if (this_is_a_controller == true) {
        show_icon_for_dynamic(dynamic_to_use)
    } else {
        basic.clearScreen()
    }
}
input.onButtonPressed(Button.B, function () {
    this_is_a_controller = true
    button_pressed_with_value(1)
})
input.onButtonPressed(Button.A, function () {
    this_is_a_controller = true
    button_pressed_with_value(-1)
})
function change_interface() {
    interface_mode_index += 1
    if (interface_mode_index >= interface_mode_array.length) {
        interface_mode_index = 0
    }
    interface_mode = interface_mode_array[interface_mode_index]
    if (this_is_a_controller == true) {
        basic.showString("" + interface_mode)
    } else {
        basic.clearScreen()
    }
}
function change_colour_by(change_colour_by_index: number) {
    colour_to_use_index += change_colour_by_index
    if (colour_to_use_index >= colors_array.length) {
        colour_to_use_index = 0
    } else if (colour_to_use_index < 0) {
        colour_to_use_index = colors_array.length - 1
    }
    colour_to_use = colors_array[colour_to_use_index]
    if (this_is_a_controller == true) {
        basic.showNumber(colour_to_use_index)
    } else {
        basic.clearScreen()
    }
}
function show_icon_for_dynamic(word: string) {
    if (word == dynamic_respond_to_music) {
        basic.showIcon(IconNames.EigthNote)
    } else if (word == dynamic_show_set_number) {
        basic.showIcon(IconNames.Triangle)
    } else if (word == dynamic_go_up_and_down) {
        basic.showIcon(IconNames.Ghost)
    }
}
input.onButtonPressed(Button.AB, function () {
    this_is_a_controller = true
    change_interface()
})
function change_brightness_by(change_by_index: number) {
    brightness_to_use_index += change_by_index
    if (brightness_to_use_index >= brightness_array.length) {
        brightness_to_use_index = brightness_array.length - 1
    } else if (brightness_to_use_index < 0) {
        brightness_to_use_index = 0
    }
    brightness_to_use = brightness_array[brightness_to_use_index]
    if (this_is_a_controller == true) {
        led.plotBarGraph(
            brightness_to_use,
            150
        )
    }
    haloDisplay.setBrightness(brightness_to_use)
}
function updatePixels() {
    haloDisplay.clear()
    if (dynamic_to_use == dynamic_show_set_number) {
        color_to_show = colour_to_use
        leds_to_turn_on_0_60 = leds_to_use
    } else if (dynamic_to_use == dynamic_go_up_and_down) {
        color_to_show = colour_to_use
        if (mode_go_up_and_down_direction_is_up) {
            leds_to_use += 1
            leds_to_turn_on_0_60 = leds_to_use
        } else {
            leds_to_use += 0 - 1
            leds_to_turn_on_0_60 = leds_to_use
        }
        if (leds_to_use > 60) {
            leds_to_use = 60
            mode_go_up_and_down_direction_is_up = false
        } else if (leds_to_use < 0) {
            leds_to_use = 0
            mode_go_up_and_down_direction_is_up = true
        }
    } else if (dynamic_to_use == dynamic_respond_to_music) {
        microphone_colume_1_100 = Math.map(kitronik_halo_hd.readSoundLevel(), 0, 512, 0, 100)
        weighted_volume_1_100 = (weighted_volume_1_100 * 2 + microphone_colume_1_100 * 1) / 3
        leds_to_turn_on_0_60 = Math.map(weighted_volume_1_100, 0, 100, 0, 60)
        if (weighted_volume_1_100 < cyan_threshold) {
            color_to_show = kitronik_halo_hd.hueToRGB(Math.map(weighted_volume_1_100, 0, cyan_threshold, 20, 80))
        } else {
            color_to_show = kitronik_halo_hd.hueToRGB(Math.map(weighted_volume_1_100, cyan_threshold, 100, 120, 160))
        }
    }
    haloDisplay.range(0, leds_to_turn_on_0_60).setColor(color_to_show)
    haloDisplay.show()
}
radio.onReceivedValue(function (message_type, value) {
    this_is_a_controller = false
    if (message_type == "color") {
        change_colour_by(value)
    } else if (message_type == "mode") {
        change_dynamic_by(value)
    } else if (message_type == "led_num") {
        change_leds_by(value)
    } else if (message_type == "bright") {
        change_brightness_by(value)
    }
})
let microphone_colume_1_100 = 0
let leds_to_turn_on_0_60 = 0
let color_to_show = 0
let this_is_a_controller = false
let cyan_threshold = 0
let weighted_volume_1_100 = 0
let haloDisplay: kitronik_halo_hd.ZIPHaloHd = null
let brightness_to_use = 0
let brightness_array: number[] = []
let colour_to_use_index = 0
let colour_to_use = 0
let colors_array: number[] = []
let mode_go_up_and_down_direction_is_up = false
let dynamic_to_use_index = 0
let dynamic_array: string[] = []
let interface_mode_index = 0
let interface_mode_array: string[] = []
let dynamic_go_up_and_down = ""
let dynamic_show_set_number = ""
let dynamic_respond_to_music = ""
let dynamic_to_use = ""
let interface_mode = ""
let interface_mode_change_brightness = ""
let interface_mode_change_leds = ""
let interface_mode_change_dynamic = ""
let interface_mode_change_color = ""
let leds_to_use = 0
let brightness_to_use_index = 0
// Initial values:
brightness_to_use_index = 2
leds_to_use = 30
interface_mode_change_color = "?"
interface_mode_change_dynamic = "?"
interface_mode_change_leds = "?"
interface_mode_change_brightness = "?"
interface_mode = "?"
radio.setGroup(1)
interface_mode_change_leds = "L"
interface_mode_change_dynamic = "D"
interface_mode_change_color = "C"
interface_mode_change_brightness = "B"
dynamic_to_use = "?"
dynamic_respond_to_music = "sound"
dynamic_show_set_number = "manual"
dynamic_go_up_and_down = "up_down"
interface_mode_array = [interface_mode_change_leds, interface_mode_change_color, interface_mode_change_brightness, interface_mode_change_dynamic]
interface_mode = interface_mode_array[interface_mode_index]
dynamic_array = [dynamic_show_set_number, dynamic_go_up_and_down, dynamic_respond_to_music]
dynamic_to_use = dynamic_array[dynamic_to_use_index]
mode_go_up_and_down_direction_is_up = true
colors_array = [ZipLedColors.White, ZipLedColors.Blue, ZipLedColors.Green, ZipLedColors.Indigo, ZipLedColors.Orange, ZipLedColors.Purple, ZipLedColors.Red, ZipLedColors.Violet, ZipLedColors.Yellow]
colour_to_use = colors_array[colour_to_use_index]
brightness_array = [0, 5, 10, 15, 20, 30, 40, 60, 80, 100, 150, 200, 255]
brightness_to_use = brightness_array[brightness_to_use_index]
haloDisplay = kitronik_halo_hd.createZIPHaloDisplay(60)
haloDisplay.setBrightness(brightness_to_use)
weighted_volume_1_100 = 0
cyan_threshold = 70
basic.forever(function () {
    updatePixels()
})
