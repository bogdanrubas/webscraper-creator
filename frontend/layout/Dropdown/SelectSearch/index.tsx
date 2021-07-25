import React, { useState, useRef, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import Icon from "layout/Icon";
import { Overlay } from "../styles";
import {
  Wrapper,
  SelectDropdownWrapper,
  Toggle,
  ContentWrapper,
  Option,
  FakeHeight,
  Label,
} from "./styles";
import { Error } from "../../Input/styles";

interface SelectSearchProps {
  style?: any;
  title: string;
  data: [
    {
      id: string;
      text: string;
    }
  ];
  gridArea?: string;
  name: string;
  label?: string;
  shadow: "background" | "container";
  onMountAlert?: boolean;
}

const SelectSearch: React.FunctionComponent<SelectSearchProps> = ({
  title,
  data,
  name,
  gridArea,
  label,
  shadow,
  style,
  onMountAlert,
}) => {
  const [onMountAlertAnimation, setOnMountAlertAnimation] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chosenOption, setChosenOption] = useState("");
  const [search, setSearch] = useState("");
  const searchInputRef: any = useRef();

  const {
    setValue,
    register,
    formState: {errors},
    setError,
    clearErrors,
    watch,
    unregister,
  } = useFormContext();

  function updateSearch(event: any) {
    setSearch(event.target.value);
  }

  function _toggleDropdown() {
    if (showDropdown === false) {
      // @ts-ignore
      setValue(name, "");
      searchInputRef.current.focus();
      setSearch("");
      setChosenOption("");
    } else {
      setTimeout(() => {
        if (chosenOption === "") {
          // @ts-ignore
          setSearch("");
          setValue(name, "");
          // @ts-ignore
          setError(name, "required", `Pole ${title} jest obowiązkowe`);
        }
      }, 150);

      searchInputRef.current.blur();
    }

    if (showDropdown) {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  }

  function selectOption(option: any) {
    // elementToggle(i);
    setChosenOption(option.text);
    setValue(name, option.id);
    clearErrors(name);
    setShowDropdown(false);

    setTimeout(() => {
      setSearch(option.text);
      searchInputRef.current.value = option.text;
    }, 100);
  }

  const contentData = data.filter(
    (element) => element.text.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );

  // useEffect(() => {
  //   // @ts-ignore
  //   register({ name });
  //   return () => {
  //     unregister(name);
  //   };
  // }, [name, register]);

  useEffect(() => {
    // @ts-ignore
    setSearch("");
  }, [watch(name)]);

  // <1>
  // ? animacja
  useEffect(() => {
    onMountAlert === true ? setOnMountAlertAnimation(true) : null;

    return () => {
      unregister(name);
    };
  }, []);
  // </1>

  return (
    <>
      <Overlay show={showDropdown} onClick={() => _toggleDropdown()} />

      <Wrapper gridArea={gridArea} shouldShow={showDropdown} style={style}>
        {label !== undefined ? <Label>{label}</Label> : null}
        <SelectDropdownWrapper
          shadow={shadow}
          pose={showDropdown ? "open" : "close"}
        >
          <Toggle
            // htmlFor={name}
            onClick={() => {
              searchInputRef.current.focus();
            }}
            showDropdown={showDropdown}
            error={!!errors[name]}
            alertAnimation={onMountAlertAnimation}
            chosenOption={chosenOption}
          >
            <Icon name="search" size={20} strokeWidth={40} color="black" />
            <input
              onChange={(e) => updateSearch(e)}
              onFocus={() => _toggleDropdown()}
              ref={searchInputRef}
              value={search}
              placeholder={title}
            />
            <input
              className='fakeInput'
              {...register(name)}
            />
            <Icon name="chevron" size={20} strokeWidth={40} color="black" />
          </Toggle>

          <ContentWrapper>
            {contentData.length === 0 ? (
              <span>
                Brak wyników dla: <b>{search}</b>
              </span>
            ) : null}

            {contentData.map((option, i) => (
              <Option
                key={i}
                index={i}
                show={showDropdown}
                // chosen={option.chosen}
                onClick={() => selectOption(option)}
              >
                {option.text}
              </Option>
            ))}
          </ContentWrapper>
        </SelectDropdownWrapper>

        <FakeHeight />

        {errors[name] ? (
          // @ts-ignore
          <Error>{errors[name].message}</Error>
        ) : null}
      </Wrapper>
    </>
  );
};

export default SelectSearch;
