import { css, keyframes } from 'styled-components';

/*
appear (PRZYKLAD):

// trzeba jako props'y przekazać komponentowi (styled-components) obiekt
// "appear" z następującymi właściwościami:

appear={{
  name: "fade",
  delay: 0,
  value: {
    x: 0,
    y: -20
  }
}}

// następnie wywołać funkcję:

export const Wrapper = styled.div`
  ${({ theme }) => theme.appear({
    name: "fade",
    delay: 500,
    value: {
      x: 0,
      y: 20
    }
  })};
`
*/

export function appear(props) {
  const {
    name,
    value,
    delay
  } = props;

  if (name === "fade") {
    const appearAnimation = keyframes`
      0% {
        transform: translate(${value.x}px, ${value.y}px);
        opacity: 0;
      }
      100% {
        transform: translateY(0px);
        opacity: 1;
      }
    `;

    const applyAnimation = animation => css`
      animation: ${appearAnimation} .35s backwards ${delay}ms;
    `;

    return applyAnimation;
  }

  if (name === "scale") {
    const appearAnimation = keyframes`
      0% {
        transform: scale(${value});
        opacity: 0;
      }
      100% {
        transform: scale(1);
        opacity: 1;
      }
    `;

    const applyAnimation = animation => css`
      animation: ${appearAnimation} .4s backwards ${delay}ms;
    `;

    return applyAnimation;
  }
}
