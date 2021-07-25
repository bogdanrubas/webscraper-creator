/*
animation (PRZYKŁAD):

// trzeba jako props'y przekazać komponentowi (styled-components) obiekt
// "animation" z następującymi właściwościami:

animation={{
  name: "fade",
  toggle: !this.state.shouldMobileFilterShow,
  delay: this.state.shouldMobileFilterShow ? 100 : 450,
  value: {
    x: 0,
    y: -40
  }
}}

// następnie wywołać funkcję:

export const Wrapper = styled.div`
  ${({ theme, animation }) => animation !== undefined ? theme.animation(animation) : ""};
`
*/

export function animation(props) {
  const {
    name,
    toggle,
    delay,
    value
  } = props;

  // fade:
  if (name === "fade" && toggle === false) {
    return {
      transition: `opacity 250ms ${delay}ms, transform 350ms ${delay}ms, background 250ms, color 250ms, top 250ms`,
      transform: `translate(${value.x}, ${value.y})`,
      pointerEvents: "none",
      opacity: 0
    }
  }
  if (name === "fade" && toggle === true) {
    return {
      transition: `opacity 250ms ${delay}ms, transform 350ms ${delay}ms, background 250ms, color 250ms, top 250ms`,
      transform: "translate(0, 0)",
      pointerEvents: "all",
      opacity: 1
    }
  }
  // translate:
  if (name === "move" && toggle === false) {
    return {
      transition: `opacity 250ms ${delay}ms, transform 350ms ${delay}ms, background 250ms, color 250ms, top 350ms`,
      transform: `translate(${value.x}, ${value.y})`,
    }
  }
  if (name === "move" && toggle === true) {
    return {
      transition: `opacity 250ms ${delay}ms, transform 350ms ${delay}ms, background 350ms, color 350ms, top 350ms`,
      transform: "translate(0, 0)",
    }
  }

}