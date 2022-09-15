import styled from "styled-components";

export const GreenTik = (props: any) => (
  <svg
    width={20}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m18 1.5-11 11-5-5"
      stroke="#21B386"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ArrowDown = ({ fill }: { fill: any }) => (
  <Svg focusable="false" viewBox="0 0 24 24" aria-hidden="true" fill={fill}>
    <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"></path>
  </Svg>
);

const Svg = styled.svg`
  width: 1em;
  height: 1em;

  /* display: inline-block; */
  font-size: 1.5rem;
  transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  cursor: pointer;
`;

export const SaveList = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Lists"
  >
    <path
      d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
      stroke="currentColor"
    ></path>
    <path
      d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
      stroke="currentColor"
    ></path>
  </svg>
);

export const FullSaveList = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Lists"
  >
    <path
      d="M4.5 6.25V21c0 .2.24.32.4.2l5.45-4.09a.25.25 0 0 1 .3 0l5.45 4.09c.16.12.4 0 .4-.2V6.25a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25z"
      fill="currentColor"
      stroke="currentColor"
      strokeLinecap="round"
    ></path>
    <path
      d="M8 6V3.25c0-.14.11-.25.25-.25h11.5c.14 0 .25.11.25.25V16.5"
      stroke="currentColor"
      strokeLinecap="round"
    ></path>
  </svg>
);

export const Writepost = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Write"
  >
    <path
      d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
      fill="currentColor"
    ></path>
    <path
      d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
      stroke="currentColor"
    ></path>
  </svg>
);

export const FullWritepost = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Write"
  >
    <path
      d="M14 4a.5.5 0 0 0 0-1v1zm7 6a.5.5 0 0 0-1 0h1zm-7-7H4v1h10V3zM3 4v16h1V4H3zm1 17h16v-1H4v1zm17-1V10h-1v10h1zm-1 1a1 1 0 0 0 1-1h-1v1zM3 20a1 1 0 0 0 1 1v-1H3zM4 3a1 1 0 0 0-1 1h1V3z"
      fill="currentColor"
    ></path>
    <path
      d="M17.5 4.5l-8.46 8.46a.25.25 0 0 0-.06.1l-.82 2.47c-.07.2.12.38.31.31l2.47-.82a.25.25 0 0 0 .1-.06L19.5 6.5m-2-2l2.32-2.32c.1-.1.26-.1.36 0l1.64 1.64c.1.1.1.26 0 .36L19.5 6.5m-2-2l2 2"
      stroke="currentColor"
    ></path>
  </svg>
);

export const ArrowIcon = ({ fill, style }: { fill: string; style: any }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    fill={fill}
    style={style}
    // class=""
    // style="left: calc(20px);"
  >
    <g>
      <path d="M12.538 6.478c-.14-.146-.335-.228-.538-.228s-.396.082-.538.228l-9.252 9.53c-.21.217-.27.538-.152.815.117.277.39.458.69.458h18.5c.302 0 .573-.18.69-.457.118-.277.058-.598-.152-.814l-9.248-9.532z"></path>
    </g>
  </svg>
);

export const Account = () => (
  <svg
    className="w-6 h-6 mr-2 fill-current dark:text-zp-white"
    viewBox="0 0 496 512"
  >
    <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm128 421.6c-35.9 26.5-80.1 42.4-128 42.4s-92.1-15.9-128-42.4V416c0-35.3 28.7-64 64-64 11.1 0 27.5 11.4 64 11.4 36.6 0 52.8-11.4 64-11.4 35.3 0 64 28.7 64 64v13.6zm30.6-27.5c-6.8-46.4-46.3-82.1-94.6-82.1-20.5 0-30.4 11.4-64 11.4S204.6 320 184 320c-48.3 0-87.8 35.7-94.6 82.1C53.9 363.6 32 312.4 32 256c0-119.1 96.9-216 216-216s216 96.9 216 216c0 56.4-21.9 107.6-57.4 146.1zM248 120c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 144c-30.9 0-56-25.1-56-56s25.1-56 56-56 56 25.1 56 56-25.1 56-56 56z"></path>
  </svg>
);

export const Signout = () => (
  <svg
    className="w-6 h-6 mr-2 fill-current  text-red-600"
    viewBox="0 0 512 512"
  >
    <path d="M48 64h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-8.8 0-16 7.2-16 16v288c0 8.8 7.2 16 16 16h132c6.6 0 12 5.4 12 12v8c0 6.6-5.4 12-12 12H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48zm279 19.5l-7.1 7.1c-4.7 4.7-4.7 12.3 0 17l132 131.4H172c-6.6 0-12 5.4-12 12v10c0 6.6 5.4 12 12 12h279.9L320 404.4c-4.7 4.7-4.7 12.3 0 17l7.1 7.1c4.7 4.7 12.3 4.7 17 0l164.5-164c4.7-4.7 4.7-12.3 0-17L344 83.5c-4.7-4.7-12.3-4.7-17 0z"></path>
  </svg>
);

export const WriteNote = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Stories"
  >
    <path
      d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
      stroke="currentColor"
    ></path>
    <path
      d="M8 8.5h8M8 15.5h5M8 12h8"
      stroke="currentColor"
      strokeLinecap="round"
    ></path>
  </svg>
);

export const AdminIcon = () => (
  <svg
    viewBox="0 0 640 512"
    className="w-6 h-6 fill-current dark:text-zp-white"
    width="24"
    height="24"
  >
    <path d="M274.7 304H173.3C77.57 304 0 381.6 0 477.3 0 496.5 15.52 512 34.66 512H413.3c19.2 0 34.7-15.5 34.7-34.7 0-95.7-77.6-173.3-173.3-173.3zm138.6 176H34.66c-1.46 0-2.66-1.2-2.66-2.7C32 399.4 95.4 336 173.3 336h101.4c77.9 0 141.3 63.4 141.3 141.3 0 1.5-1.2 2.7-2.7 2.7zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm0-224c52.94 0 96 43.06 96 96 0 52.93-43.06 96-96 96s-96-43.1-96-96c0-52.94 43.1-96 96-96zm151.1 209c17.8 9.8 37.2 15 56.9 15 61.8 0 112-50.2 112-112S493.8 32 432 32c-12.83 0-25.39 2.156-37.34 6.391-8.328 2.953-12.69 12.09-9.734 20.42 2.953 8.344 12.12 12.66 20.42 9.734C413.9 65.53 422.8 64 432 64c44.1 0 80 35.89 80 80s-35.9 80-80 80c-14.08 0-27.91-3.703-39.98-10.69-7.656-4.453-17.44-1.828-21.86 5.828C365.7 226.8 368.3 236.6 375.1 241zm115.6 79H448c-8.844 0-16 7.156-16 16s7.2 16 16 16h42.67C555.4 352 608 404.6 608 469.3c0 5.9-4.8 10.7-10.7 10.7H496c-8.844 0-16 7.156-16 16s7.156 16 16 16h101.3c23.6 0 42.7-19.1 42.7-42.7 0-83.2-67-149.3-149.3-149.3z"></path>
  </svg>
);

export const FullAdminIcon = () => (
  <svg
    viewBox="0 0 640 512"
    className="w-6 h-6 fill-current active:fill-white"
    width="24"
    height="24"
  >
    <path d="M274.7 304H173.3C77.57 304 0 381.6 0 477.3 0 496.5 15.52 512 34.66 512H413.3c19.2 0 34.7-15.5 34.7-34.7 0-95.7-77.6-173.3-173.3-173.3zm138.6 176H34.66c-1.46 0-2.66-1.2-2.66-2.7C32 399.4 95.4 336 173.3 336h101.4c77.9 0 141.3 63.4 141.3 141.3 0 1.5-1.2 2.7-2.7 2.7zM224 256c70.7 0 128-57.31 128-128S294.7 0 224 0 96 57.31 96 128s57.3 128 128 128zm0-224c52.94 0 96 43.06 96 96 0 52.93-43.06 96-96 96s-96-43.1-96-96c0-52.94 43.1-96 96-96zm151.1 209c17.8 9.8 37.2 15 56.9 15 61.8 0 112-50.2 112-112S493.8 32 432 32c-12.83 0-25.39 2.156-37.34 6.391-8.328 2.953-12.69 12.09-9.734 20.42 2.953 8.344 12.12 12.66 20.42 9.734C413.9 65.53 422.8 64 432 64c44.1 0 80 35.89 80 80s-35.9 80-80 80c-14.08 0-27.91-3.703-39.98-10.69-7.656-4.453-17.44-1.828-21.86 5.828C365.7 226.8 368.3 236.6 375.1 241zm115.6 79H448c-8.844 0-16 7.156-16 16s7.2 16 16 16h42.67C555.4 352 608 404.6 608 469.3c0 5.9-4.8 10.7-10.7 10.7H496c-8.844 0-16 7.156-16 16s7.156 16 16 16h101.3c23.6 0 42.7-19.1 42.7-42.7 0-83.2-67-149.3-149.3-149.3z"></path>
    <path
      d="M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const Home = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home">
    <path
      d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const FullHome = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-label="Home">
    <path
      d="M4.5 21.25V10.87c0-.07.04-.15.1-.2l7.25-5.43a.25.25 0 0 1 .3 0l7.25 5.44c.06.04.1.12.1.2v10.37c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25v-5.5a.25.25 0 0 0-.25-.25h-4.5a.25.25 0 0 0-.25.25v5.5c0 .14-.11.25-.25.25h-4.5a.25.25 0 0 1-.25-.25z"
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
    ></path>
    <path
      d="M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
);

export const ListofItem = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Stories"
  >
    <path
      d="M4.75 21.5h14.5c.14 0 .25-.11.25-.25V2.75a.25.25 0 0 0-.25-.25H4.75a.25.25 0 0 0-.25.25v18.5c0 .14.11.25.25.25z"
      stroke="currentColor"
    ></path>
    <path
      d="M8 8.5h8M8 15.5h5M8 12h8"
      stroke="currentColor"
      strokeLinecap="round"
    ></path>
  </svg>
);

export const FullistofItem = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    aria-label="Stories"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M4 2.75c0-.41.34-.75.75-.75h14.5c.41 0 .75.34.75.75v18.5c0 .41-.34.75-.75.75H4.75a.75.75 0 0 1-.75-.75V2.75zM7 8.5c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 7c0-.28.22-.5.5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zM7 12c0-.28.22-.5.5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 7 12z"
      fill="currentColor"
    ></path>
  </svg>
);

export const Close = () => (
  <svg className="de" width="29" height="29">
    <path
      d="M20.13 8.11l-5.61 5.61-5.6-5.61-.81.8 5.61 5.61-5.61 5.61.8.8 5.61-5.6 5.61 5.6.8-.8-5.6-5.6 5.6-5.62"
      fillRule="evenodd"
    ></path>
  </svg>
);
