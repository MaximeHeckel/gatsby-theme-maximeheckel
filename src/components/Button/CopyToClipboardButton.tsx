import { css } from '@emotion/core';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import React from 'react';

export const CopyToClipboardButton = (props: { text: string }) => {
  const duration = 0.4;
  const boxVariants = {
    hover: (isChecked: boolean) => ({
      scale: 1.05,
      strokeWidth: 3,
      opacity: isChecked ? 0 : 1,
    }),
    pressed: (isChecked: boolean) => ({
      scale: 0.95,
      strokeWidth: 1,
      opacity: isChecked ? 0 : 1,
    }),
    checked: { opacity: 0 },
    unchecked: { stroke: '#949699', strokeWidth: 2, opacity: 1 },
  };

  const tickVariants = {
    pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.05 }),
    checked: { pathLength: 1 },
    unchecked: { pathLength: 0 },
  };

  const [isChecked, setIsChecked] = React.useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  const copyToClipboard = (content: string) => {
    const el = document.createElement(`textarea`);
    el.value = content;
    el.setAttribute(`readonly`, ``);
    el.style.position = `absolute`;
    el.style.left = `-9999px`;
    document.body.appendChild(el);
    el.select();
    document.execCommand(`copy`);
    document.body.removeChild(el);
  };

  React.useEffect(() => {
    if (isChecked) {
      setTimeout(() => setIsChecked(false), 3000);
    }
  }, [isChecked]);

  return (
    <button
      css={css`
        background: transparent;
        border: none;
        height: 25px;
        cursor: ${isChecked ? 'default' : 'pointer'};
        outline: none;
      `}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
      disabled={isChecked}
      onClick={() => {
        copyToClipboard(props.text);
        setIsChecked(true);
      }}
    >
      <motion.svg
        initial={false}
        animate={isChecked ? 'checked' : 'unchecked'}
        whileHover="hover"
        whileTap="pressed"
        transition={{ duration }}
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M20.8511 9.46338H11.8511C10.7465 9.46338 9.85107 10.3588 9.85107 11.4634V20.4634C9.85107 21.5679 10.7465 22.4634 11.8511 22.4634H20.8511C21.9556 22.4634 22.8511 21.5679 22.8511 20.4634V11.4634C22.8511 10.3588 21.9556 9.46338 20.8511 9.46338Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={boxVariants}
          custom={isChecked}
          transition={{ duration }}
        />
        <motion.path
          d="M5.85107 15.4634H4.85107C4.32064 15.4634 3.81193 15.2527 3.43686 14.8776C3.06179 14.5025 2.85107 13.9938 2.85107 13.4634V4.46338C2.85107 3.93295 3.06179 3.42424 3.43686 3.04917C3.81193 2.67409 4.32064 2.46338 4.85107 2.46338H13.8511C14.3815 2.46338 14.8902 2.67409 15.2653 3.04917C15.6404 3.42424 15.8511 3.93295 15.8511 4.46338V5.46338"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={boxVariants}
          custom={isChecked}
          transition={{ duration }}
        />
        <motion.path
          d="M20 6L9 17L4 12"
          stroke="#949699"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={tickVariants}
          style={{ pathLength, opacity }}
          custom={isChecked}
          transition={{ duration }}
        />
      </motion.svg>
    </button>
  );
};
