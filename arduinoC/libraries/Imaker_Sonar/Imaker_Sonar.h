#ifndef Imaker_Sonar_H
#define Imaker_Sonar_H

#include <Arduino.h>
#include <Wire.h>

class Imaker_Sonar
{
  public:
    Imaker_Sonar();
    ~Imaker_Sonar();
    float readSonar();

  private:
    void initSonar();
    bool initialized;
};

#endif
