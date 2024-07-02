---
id: changelog
title: OneWare Studio Changelog
sidebar_label:  Changelog
---

## 0.17.6.0

- Fix IDE Updater download path
- Update VHDL / Verible support
- Remove TOML Creator
- Fix FixedPointShift for negative Signed Integers in VCD
  
## 0.17.5.0

- Fix Signed Decimal Converter for VCD
- Fix Hex Converter for VCD
- Add ASCII Converter for VCD
- Add IDE Updater for Windows/MacOS

## 0.17.4.0

- Add VCD Viewer Horizontal Scrollbar
- Fix an issue where errors in child processes (GHDL, ...) would get ignored
  
## 0.17.3.0

- Hide Hover box when focus lost
- VCD Viewer now correctly shows all STD_LOGIC values in binary mode
- Improved VCD Rendering
- Improved VCD Parsing with multiple threads
  
## 0.17.2.0

- Hide Hover box when alt tabbing
- Update linux libraries

## 0.17.1.0

- Fix small version upgrades on windows
- Update OneWare.Essentials Plugin base to 0.5.0
- Update OneWare.UniversalFPGAProject Plugin base to 0.20.0
- Fix auto bracket
- Fix Completionwindow tooltip misplacement
  
## 0.17.0.4

- Fix open project dialog on Unix
- Allow selecting completion items by click
  
## 0.17.0.3

- Fix VCD Viewer error when loading small VCD Files with multiple threads
- Add VCD Viewer Datatypes
- Add Fixed Point Shift
  
## 0.17.0.2

- Add VCD Viewer support for REAL Type
- Fix VCD Viewer invalid value casting
- Adjust VCD Viewer styles
- Fix an VCD Viewer issue that hides small changes in a big timewindow
  
## 0.17.0.1

- Fix binary packages not setting environment variables at all times
- Add Max1000 16k, Max10 Ultra and Cyc5000
- Add more options to customize programming workflows
- No longer remove empty folders while renaming them

## 0.16.8.0

- Add Max10 and Max1000 to default FPGA list
- Add Long Term Programming
- Add device-conf for each device, allowing to customize Toolchain/Loader arguments
- Add button for VCD Viewer to add signals
- Minor Style changes

## 0.16.6.0

- Improve Package Manager System, allowing to directly update binaries such as GHDL
- Add VHDL-LS Package for OSX-ARM64
- Fix an issue with VCD Viewer reloading files after showing live simulation

## 0.16.4.0

- Fix Internal environment settings
- Fix VCD Parser not correctly showing values on all scopes

## 0.16.2.0

- Fix wrong VCD Path after Simulation
  
## 0.16.1.0

- Add Testbenches to Project System for easy GHDL/IVerilog settings
- Add Update Notifications for future versions
- Force child processes to close with studio
- Make VCDViewer correctly use $timescale in VCD Files
- Make VCDViewer controllable by keys (arrow keys for navigation and CTRL+Wheel for zoom)
- Make VCDViewer focus on set marker while zooming
- API Changes for easier plugin development

## 0.15.3.0

- Yosys/OpenFPGALoader fixes
- Added timer to tasks
- Bug fixes

## 0.15.0.0

- Lots of bug fixes
- Add Max10 Board
  
## 0.14.0.0

- Lots of bug fixes
  
## 0.13.1.0

- First Preview Release
