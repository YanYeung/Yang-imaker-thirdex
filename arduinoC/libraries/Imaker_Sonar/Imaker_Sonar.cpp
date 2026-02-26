#include "Imaker_Sonar.h"
#include "Arduino.h"
#include "Wire.h"

Imaker_Sonar::Imaker_Sonar(): initialized(false) {}

Imaker_Sonar::~Imaker_Sonar() 
{
  this->initialized = false;
}

void Imaker_Sonar::initSonar()
{
  Wire.begin();
  this->initialized = true;
}

float Imaker_Sonar::readSonar()
{
  if (!initialized) {
    this->initSonar();
  }
  
  float distance = 0;
  float ds[3] = {0, 0, 0};
  uint8_t i = 0;
  
  Wire.beginTransmission(0x57);
  Wire.write(1);
  Wire.endTransmission();
  delay(110);
 
  Wire.requestFrom(0x57, 3);
  while (Wire.available()) {
    if (i < 3) {
      ds[i++] = Wire.read();
    } else {
      Wire.read(); // consume extra bytes if any
    }
  }
  
  distance = (ds[0] * 65536 + ds[1] * 256 + ds[2]) / 10000; //计算成CM值
  
  if ((distance > 2) && (distance <= 400)) {
    return distance;
  }
  
  delay(30);
  return -1; // 返回 -1 表示数据错误
}
