import { useState, useEffect } from "react";

const useLocalStorage = <Data>(
  key: string,
  defaultValue: Data
): [Data, React.Dispatch<React.SetStateAction<Data>>] => {
  const [value, setValue] = useState<Data>(defaultValue);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    if (firstLoad) {
      let currentValue;
      try {
        currentValue = JSON.parse(
          localStorage.getItem(key) || String(defaultValue)
        );
      } catch (error) {
        currentValue = defaultValue;
      }
      setFirstLoad(false);
      setValue((_) => currentValue);
      localStorage.setItem(key, JSON.stringify(currentValue));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key, defaultValue, firstLoad]);

  return [value, setValue];
};

export default useLocalStorage;
