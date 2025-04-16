---
id: changelog
title: OneWare Studio Changelog
sidebar_label:  Changelog
---

## 0.21.2.0

- Allow plugins to load additional plugins
- Add project settings functionality

## 0.21.1.0

- Improve VCD Live View
- Switch RX and TX in USB Component
- Add VHDL Standard to Project Properties
- Fix a pissuble VCD Viewer crash when zooming in
- Make VCD Viewer Signals Selectable (needed for Extensions)
- Small bug fixes

## 0.21.0.0

- Upgrade to NET9
- New Plugin Compatibility System
- Various fixes and improvements
  
## 0.20.5.0

- Allow clicking on error messages (from GHDL) with control to jump to file
- Allow adding custom sources for Packages
- Add Library Explorer (needed for future updates)
- Add new GUI Element for FPGAs (pinBlock)

## 0.20.4.0

- Fix GTKWave not working from oss-cad-suite on Windows
- Fix one bug with indentation in VHDL
- Add "event" type to VCD Viewer

## 0.20.3.0

**There might be some issues on Windows after this update, caused by the installer. To resolve them, simply remove and re-install!**

- Fix VCD not showing small changes
- Fix VCD showing changes when value doesn't change
- Update VHDL support
- Fix some smaller issues
  
## 0.20.1.0

- Add more elements for FPGA GUI Creation
- Fix FPGA GUI for fractional scaling
  
## 0.20.0.0

**This update changes the way FPGA Dev Boards are loaded. As of now (9th August), only Max1000 and IceBreaker are available as packages, the others will follow in the coming days!**

- Add System that allows adding any FPGA Board by using JSON Files (with GUI!). **Documentation will follow**
- You can now zoom and move around with rightclick (or WASD/Arrow keys) in the Connect and Compile window!
- Add search combo box to some GUIs
- Fix some package incompatibility issues for future versions.
- Fix issue that caused the langauge server options not to be visible
- Fix SearchBox reset button

## 0.19.2.0

- Fix saving for custom device properties (Yosys/Quartus/...)
- Improve VCD Scale
- Improve Completion filtering
- Change Releases to Github Releases

## 0.19.1.0

- Fix Comboboxsetting binding error

## 0.19.0.0

**Due to changes with the plugin system, some plugins might need to be removed and reinstalled afer installing this update!**

- Update Plugin Base
- Delete files using the delete key
- Lots of small fixes and improvements (Avalonia Update)

## 0.18.5.0

- Fix terminal size on macos
- Ignore VT_VERSION Environment for terminal
- Improve scrolling in terminal
- Fix crash for linux terminals

## 0.18.4.0

- Fix possible terminal crash
- Change default terminal on MacOS zo zsh (if available)
- Open .GHW and .FST with GTKWave by default, if it is available
- Extensions will no longer lose their settings if they are incompatible because of IDE update

## 0.18.3.0

- Update base packages
- Add automatic package updates to IDE Updater system
- Fix snippets for some c++ completions
- Fix "update successful" notification showing every start

## 0.18.2.0

- Add snippet support for completion
- Added snippets for VHDL and Verilog completion
- Fix changelog not loading after update
- Fix completion getting out of sync with LSP

## 0.18.1.0

- Fix two possible crashes caused by invalid highlighting due to out of sync LS with editor
- Remove round bottom corners for main window in Windows 11

## 0.18.0.0

- VCD ignore entries without value change
  
## 0.17.7.0

**There was a bug with the builtin updater, make sure to manually download this update**

- Fix IDE Updater download path
- Fix VCD Viewer for files with large amount of signals
- Fix VCD Viewer vertical scrolling
- Add VCD Viewer horizontal scrolling with Mousewheel + Shift
- Added LSP Document Highlighting functionality
- Added LSP Inlay Hints functionality
- Added LSP support for semantic token highlighting
- Hide external errors on default (changeable in experimental settings)
- Improve control and click action for LSP (was broken on MacOS)
- Added binaries for linux, if snap is not available

## 0.17.6.0

- Update VHDL / Verible support
- Remove TOML Creator
- Fix FixedPointShift for negative Signed Integers in VCD
- Escape string produces by ASCII VCD lines
  
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
