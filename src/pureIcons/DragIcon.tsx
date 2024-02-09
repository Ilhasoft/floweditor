import React from 'react';

export interface DragIconProps {
  draggable: boolean;
}

export class DragIcon extends React.PureComponent<DragIconProps> {
  render() {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-draggable={this.props.draggable}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.91422 2.00989C7.86649 2.02164 7.82897 2.03857 7.79282 2.06468C7.74877 2.09651 3.54653 6.30199 3.52607 6.33472C3.50908 6.36192 3.48965 6.40724 3.47876 6.44512C3.47512 6.45777 3.47253 6.49256 3.47249 6.52912C3.47245 6.57971 3.4745 6.59875 3.48334 6.62971C3.51797 6.75101 3.61974 6.85233 3.74065 6.88586C3.76225 6.89185 3.78827 6.89385 3.84174 6.89362C3.90591 6.89335 3.91779 6.89197 3.95107 6.88089C4.03806 6.85193 3.87354 7.01214 6.02937 4.85694L8.00101 2.88589L9.97264 4.85694C12.1296 7.01331 11.9645 6.85256 12.0509 6.88056C12.1015 6.89694 12.1868 6.90098 12.2419 6.8896C12.3223 6.87299 12.4043 6.82035 12.4562 6.75198C12.5112 6.67955 12.5296 6.6236 12.5295 6.52912C12.5295 6.49256 12.5269 6.45777 12.5233 6.44512C12.5124 6.40724 12.4929 6.36192 12.4759 6.33472C12.4555 6.30199 8.25324 2.09651 8.20919 2.06468C8.12948 2.0071 8.01329 1.98552 7.91422 2.00989ZM3.79339 9.10481C3.74621 9.11027 3.69174 9.12854 3.6508 9.15264C3.60962 9.17687 3.5463 9.2393 3.52323 9.2784C3.4526 9.39811 3.45254 9.53867 3.52308 9.66011C3.53538 9.68128 4.02231 10.1712 5.64881 11.7988C6.8092 12.9599 7.77156 13.9193 7.7874 13.9306C7.90755 14.0169 8.06109 14.0231 8.19195 13.9471C8.21312 13.9348 8.70302 13.4479 10.3306 11.8214C11.4918 10.661 12.4511 9.69861 12.4625 9.68277C12.5114 9.61453 12.5295 9.5569 12.5295 9.46917C12.5295 9.42155 12.5273 9.40144 12.5188 9.37169C12.4529 9.14042 12.194 9.03352 11.9818 9.14993C11.9525 9.16598 11.7404 9.37651 9.97505 11.1413L8.00101 13.1148L6.02458 11.139L4.04814 9.16328L4.00254 9.14115C3.93469 9.1082 3.86652 9.09636 3.79339 9.10481Z"
          fill="#D0D3D9"
          className="primary"
        />
      </svg>
    );
  }
}