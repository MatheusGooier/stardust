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

  .ant-picker-header-view {
    color: ${({ theme }) => theme.text} 
  }

  .ant-picker-header > button {
    color: ${({ theme }) => theme.alertText}
  }

  .ant-picker-panel-container {
    background-color: ${({ theme }) => theme.inputBackgroundColor};
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
    background-color:  ${({ theme }) => theme.listLine};
  }

  .ant-table table {
    background-color:  ${({ theme }) => theme.listLine};
    color: ${({ theme }) => theme.text};
  }

  .ant-alert-success {
    border: 1px solid ${({ theme }) => theme.alertBorder};
    background-color: ${({ theme }) => theme.alertBG};
  }

  .ant-alert-message {
    color: ${({ theme }) => theme.alertText};
  }

  // .ant-picker-cell {
  //   color: ${({ theme }) => theme.daysInactiveColor};
  // }

  .ant-btn-dangerous {
    background: ${({ theme }) => theme.dangerousButton};
  }

  .ant-btn-primary {
    color: ${({ theme }) => theme.primaryButton}
  }

  .ant-table-thead > tr > th {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-list-item-meta-title {
    color: ${({ theme }) => theme.text};
  }

  .ant-list-item-meta-description {
    color: ${({ theme }) => theme.text};
  }

  .ant-pagination-prev .ant-pagination-item-link, .ant-pagination-next .ant-pagination-item-link {
    background-color: ${({ theme }) => theme.inputBackgroundColor}
  }

  .ant-list-empty-text {
    background-color: ${({ theme }) => theme.listLine}
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: ${({ theme }) => theme.listLineHover}
  }

  .ant-divider-horizontal.ant-divider-with-text::before, .ant-divider-horizontal.ant-divider-with-text {
    border-color: ${({ theme }) => theme.text};
  }

  .ant-table-row-expand-icon {
    background: inherit
  }

  tr.ant-table-expanded-row > td, tr.ant-table-expanded-row:hover > td {
    background-color: rgba(150, 150, 150, 0.2)
  }

  .ant-checkbox + span{
    color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper > .ant-radio-button { 
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper  {
    background-color:  ${({ theme }) => theme.inputBackgroundColor};
    color: ${({ theme }) => theme.text};
    transition: none;
    border: 1px solid ${({ theme }) => theme.buttonBorder};
  }

  .ant-radio-button-wrapper:first-child{
    border-left: 1px solid ${({ theme }) => theme.buttonBorder};
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled) {
    color: ${({ theme }) => theme.text};
    border-color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    border-color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before {
    background-color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):first-child {
    border-color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper-checked:not([class*=' ant-radio-button-wrapper-disabled']).ant-radio-button-wrapper:first-child {
    border-right-color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper:hover {
    color: ${({ theme }) => theme.text};
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover::before {
    background-color: ${({ theme }) => theme.text};
  }

  .ant-switch-checked{
    background-color: ${({ theme }) => theme.switchBg};
  }

  .ant-switch {
    background-color: ${({ theme }) => theme.switchBg};
  }

  .ant-empty-description {
    color:  ${({ theme }) => theme.text};
  }

  .ant-input-affix-wrapper  {
    background-color: ${({ theme }) => theme.inputBackgroundColor}
  }

  .bg-gray-800 {
    --tw-bg-opacity: 1;
    background-color: ${({ theme }) => theme.footerBg};
  }

  .footer {
    position: fixed;
    bottom: 0px;
  }
  `;
