import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  
  .ant-input {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-input-number-input {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-picker {    
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-calendar {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-calendar-full .ant-picker-panel {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-form-item-label > label {
    color: ${({ theme }) => theme.text};
  }

  .ant-divider-horizontal.ant-divider-with-text {
    color: ${({ theme }) => theme.text};
  }

  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-select-arrow {    
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-content th {
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-cell-in-view {
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today {
    background-color:  ${({ theme }) => theme.calendarCellSelectedBGColor};
  }

  .ant-picker-cell:hover:not(.ant-picker-cell-in-view) .ant-picker-cell-inner, .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
    background-color:  ${({ theme }) => theme.calendarCellHoverBGColor};
  }

  .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected .ant-picker-calendar-date-today .ant-picker-calendar-date-value, .ant-picker-calendar-full .ant-picker-panel .ant-picker-cell-selected:hover .ant-picker-calendar-date-today .ant-picker-calendar-date-value {
    color: ${({ theme }) => theme.textInvert};
  }
  
  .ant-picker-calendar-full .ant-picker-panel .ant-picker-calendar-date-today .ant-picker-calendar-date-value {
    color: ${({ theme }) => theme.text};
  }

  h5.ant-typography, .ant-typography h5 {
    color: ${({ theme }) => theme.text};
  }

  .ant-picker-input > input {
    color: ${({ theme }) => theme.text};
  }

  .anticon {
    color: ${({ theme }) => theme.text};
  }

  .ant-list-lg .ant-list-item {
    background-color:  ${({ theme }) => theme.calendarCellSelectedBGColor};
  }

  .ant-table table {
    background-color:  ${({ theme }) => theme.calendarCellSelectedBGColor};
  }

  `;
