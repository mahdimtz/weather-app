interface Weather {
    current: { temperature_2m: number; weather_code: number };
    daily: {
      time: string[]
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];

    };
  }