/** 
 * @brief imaker sensors Mind+ library.
 * @n This is a MindPlus graphics programming extension for imaker's module.
 * @date  2026-02-01
*/

enum motor {
    //% block="M1"
    M1,
    //% block="M2"
    M2,
    //% block="M3"
    M3,
    //% block="M4"
    M4,
    //% block="全部"
    ALL
}
enum stepper {
    //% block="STP1"
    M1_M2,
    //% block="STP2"
    M3_M4
}

enum Turn {
    //% block="正转"
    CW,
    //% block="反转"
    CCW
}

enum stpTurn {
    //% block="1/4"
    1_4,
    //% block="1/2"
    1_2,
	//% block="1"
    1,
    //% block="2"
    2,
	//% block="3"
    3,
    //% block="4"
    4,
	//% block="5"
    5
}

enum servo {
    //% block="S1"
    S1,
     //% block="S2"
    S2,
    //% block="S3"
    S3,
     //% block="S4"
    S4,
    //% block="S5"
    S5,
     //% block="S6"
    S6,
    //% block="S7"
    S7,
     //% block="S8"
    S8
}

enum I2Cpin {
    //% block="E0"
    kGpioPinE0,
    //% block="E1"
    kGpioPinE1,
    //% block="E2"
    kGpioPinE2,
    //% block="E3"
    kGpioPinE3,
    //% block="E4"
    kGpioPinE4,
    //% block="E5"
    kGpioPinE5,
    //% block="E6"
    kGpioPinE6,
    //% block="E7"
    kGpioPinE7,
}

enum ServoMotorPin {
    //% block="E1"
    kGpioPinE1,
    //% block="E2"
    kGpioPinE2
}

enum I2Cmode {
    //% block="ADC mode"
    kAdc,
    //% block="Floating input mode"
    kInputFloating, 
    //% block="Pull up input mode"
    kInputPullUp,
    //% block="Dropdown input mode"
    kInputPullDown,
    //% block="Output mode"
    kOutput,
    //% block="PWM mode (only supports E1 and E2)"
    kPwm,
    //% block="Servo mode (only supports E1 and E2)"
    kPwm1
}

enum PinLevel {
    //% block="HIGH"
    HIGH,
    //% block="LOW"
    LOW
}
enum IDMDIGITAL {
    //% blockId="DIM_BUTTON" block="BUTTON"
    BUTTON,
    //% blockId="DIM_PYROELECTRIC_SENSOR" block="PYROELECTRIC_SENSOR"
    PYROELECTRIC_SENSOR,

}
enum ODMDIGITAL {
    //% blockId="DOM_LED" block="LED"
    LED,


}

enum IAMANALOG {

    //% blockId="AIM_POTENTIOMETER" block="POTENTIOMETER"
    POTENTIOMETER,
    //% blockId="AIM_SOIL_HUMIDITY" block="SOIL_HUMIDITY"
    SOIL_HUMIDITY,

}

enum DHT {
    //% blockId="DHT_11" block="DHT11"
    11,
    //% blockId="DHT_22" block="DHT22"
    22,
}

enum DHT_TH {
    //% blockId="DHT_T" block="temperature(℃)"
    Temperature,
    //% blockId="DHT_H" block="humidity(%rh)"
    Humidity,
}

enum SRUNIT {
    //% blockId="SRUNIT_CM" block="cm"
    CM,
    //% blockId="SRUNIT_IN" block="inch"
    IN,
}

enum ONEBUTTONMODE {
    //% blockId="ONEBUTTONMODE_attachClick" block="Click"
    attachClick,
    //% blockId="ONEBUTTONMODE_attachDoubleClick" block="DoubleClick"
    attachDoubleClick,
    //% blockId="ONEBUTTONMODE_attachLongPressStart" block="LongPressStart"
    attachLongPressStart,
    //% blockId="ONEBUTTONMODE_attachDuringLongPress" block="DuringLongPress"
    attachDuringLongPress,
    //% blockId="ONEBUTTONMODE_attachLongPressStop" block="LongPressStop"
    attachLongPressStop,
}

enum ONEBUTTONTRIG {
    //% blockId="ONEBUTTONTRIG_LOW" block="LOW"
    true,
    //% blockId="ONEBUTTONTRIG_HIGH" block="HIGH"
    false,
}

enum PinLevel {
    //% block="HIGH"
    HIGH,
    //% block="LOW"
    LOW
}

//% color="#5650a5" iconWidth=50 iconHeight=40
namespace imaker_sensor {
    //% block="read [INPUTMODULEDIGITAL] on [IDMPIN]" blockType="boolean"
    //% INPUTMODULEDIGITAL.shadow="dropdown" INPUTMODULEDIGITAL.options="IDMDIGITAL" INPUTMODULEDIGITAL.defl="IDMDIGITAL.MAGNETIC_SENSOR"
    //% IDMPIN.shadow="dropdown" IDMPIN.options="PIN_DigitalRead"
    export function inputDigitalModule(parameter: any, block: any) {
        let inputModule = parameter.INPUTMODULEDIGITAL.code;
        let inputModulePin = parameter.IDMPIN.code;
        
        if(Generator.board === 'pico'){//如果是pico板，生成如下代码
            Generator.addSetup(`pinMode_${inputModulePin}`,`pinMode(${inputModulePin}, INPUT);`);
        }
        if(inputModule === 'BUTTON'){//如果是按键，生成如下代码
            if (inputModulePin == 'P0' || inputModulePin == 'P1'){
                Generator.addCode(`!digitalRead(${inputModulePin})`);
            }
            else{
                Generator.addCode(`!digital_read(${inputModulePin})`);
            }
        }
        else{//其他传感器，生成如下代码
            if (inputModulePin == 'P0' || inputModulePin == 'P1'){
                Generator.addCode(`digitalRead(${inputModulePin})`);
            }
            else{
                Generator.addCode(`digital_read(${inputModulePin})`);
            }
        }
    }

    //% block="read [INPUTMODULEANALOG] on [IAMPIN]" blockType="reporter"
    //% INPUTMODULEANALOG.shadow="dropdown" INPUTMODULEANALOG.options="IAMANALOG" INPUTMODULEANALOG.defl="IAMANALOG.LIGHT"
    //% IAMPIN.shadow="dropdown" IAMPIN.options="PIN_AnalogRead"
    export function inputAnalogModule(parameter: any, block: any) {
        let inputModule = parameter.INPUTMODULEANALOG.code;
        let inputModulePin = parameter.IAMPIN.code;
        Generator.addCode(`analogRead(${inputModulePin})`);
    }

        //% block="read ulrasonic sensor （cm）" blockType="reporter"
    export function readSonarI2C(parameter: any, block: any) {
        Generator.addInclude("include_Imaker_Sonar", `#include <Imaker_Sonar.h>`);
        Generator.addObject("object_Imaker_Sonar", `Imaker_Sonar`, `sonar;`);
        Generator.addCode(`sonar.readSonar()`);
    }

    //% block="write [OUTPUTMODULEDIGITAL] on [ODMPIN] [LEVEL]" blockType="command"
    //% OUTPUTMODULEDIGITAL.shadow="dropdown" OUTPUTMODULEDIGITAL.options="ODMDIGITAL" OUTPUTMODULEDIGITAL.defl="ODMDIGITAL.LED"
    //% ODMPIN.shadow="dropdown" ODMPIN.options="PIN_DigitalWrite"
    //% LEVEL.shadow="dropdown" LEVEL.options="PinLevel" LEVEL.defl="PinLevel.HIGH"
    export function outputDigitalModule(parameter: any, block: any) {
        let outputModule = parameter.OUTPUTMODULEDIGITAL.code;
        let outputModulePin = parameter.ODMPIN.code;
        let level = parameter.LEVEL.code;
        Generator.addSetup(`pinMode_${outputModulePin}`,`pinMode(${outputModulePin}, OUTPUT);`);
        if (outputModulePin == 'P0' || outputModulePin == 'P1'){
            Generator.addCode(`digitalWrite(${outputModulePin}, ${level});`);
        }
        else{

            Generator.addCode(`digital_write(${outputModulePin}, ${level});`);
        }
    }

    //% block="STOP  MOTOR[motor] " blockType="command"
    //%motor.shadow="dropdown" motor.options="motor"
    export function motorstop(parameter: any, block: any) {
        let M = parameter.motor.code
        Generator.addInclude("Motor", "#include <EM_Microbit_Motor.h>");
        Generator.addObject("MotorObject", "EM_Microbit_Motor", " motorbit;");
        Generator.addCode(`	motorbit.motorStop(${M});`);
    }

    //% block=" MOTOR[motor]speed[SPEED] TUEN[Turn]" blockType="command"
    //%motor.shadow="dropdown" motor.options="motor"
    //% SPEED.shadow="range"   SPEED.params.min=0    SPEED.params.max=255 SPEED.defl=255
    //%Turn.shadow="dropdown" Turn.options="Turn"
    export function motor(parameter: any, block: any) {
        let M = parameter.motor.code
        let T = parameter.Turn.code
        let speed = parameter.SPEED.code
        Generator.addInclude("Motor", "#include <EM_Microbit_Motor.h>");
        Generator.addObject("MotorObject", "EM_Microbit_Motor", "motorbit;");
        Generator.addCode(`motorbit.motorRun(${M},${T},${speed}) ;`);

    }
   


    //% block=" SERVO270[servo]angle[ANGLE] " blockType="command"
    //%servo.shadow="dropdown" servo.options="servo"
    //% ANGLE.shadow="range"   ANGLE.params.min=0    ANGLE.params.max=270 ANGLE.defl=135
    
    export function servo270(parameter: any, block: any) {
        let servo = parameter.servo.code
        let angle = parameter.ANGLE.code
        Generator.addInclude("Motor", "#include <EM_Microbit_Motor.h>");
        Generator.addObject("MotorObject", "EM_Microbit_Motor", "motorbit;");
        Generator.addCode(`motorbit.servo270(${servo},${angle});`);
    }

    //% block=" SERVO360[servo]angle[ANGLE] " blockType="command"
    //%servo.shadow="dropdown" servo.options="servo"
    //% ANGLE.shadow="range"   ANGLE.params.min=0    ANGLE.params.max=360 ANGLE.defl=180
    
    export function servo360(parameter: any, block: any) {
        let servo = parameter.servo.code
        let angle = parameter.ANGLE.code
        Generator.addInclude("Motor", "#include <EM_Microbit_Motor.h>");
        Generator.addObject("MotorObject", "EM_Microbit_Motor", "motorbit;");
        Generator.addCode(`motorbit.servo360(${servo},${angle});`);
    }

    
}
