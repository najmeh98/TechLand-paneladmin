import { css, FlattenSimpleInterpolation } from "styled-components";

// export const tablet = (body: any): FlattenSimpleInterpolation => css`
//   @media (max-width: 950px) and (max-width: 1024px) {
//     ${body};
//   }
// `;

export const mobile = (body: any) => css`
  @media (max-width: 768px) {
    ${body}
  }
`;

export const notmobile = (inner: any) => css`
  @media (max-width: 500px) {
    ${inner};
  }
`;

export const desktop = (body: any) => css`
  @media (min-width: 1024px) {
    ${body};
  }
`;

export const tablet = (body: any) => css`
  @media (max-width: 976px) {
    ${body};
  }
`;
