---
title: Write your own Plugin
---

:::warning
Writing a plugin for OneWareStudio can be considered experimental, as not all the API is 100% done yet. 
Future updates can break your plugin. Documentation is incomplete and looking at the source code is nessesary. 
A good understanding of C# and Avalonia is recommended.
**If you just want to add your own hardware support, you can [do it without using C#](/docs/studio/tutorials/add-hardware)**
:::

## Prerequisites

- NET 8.0 SDK
- C# Code Editor (JetBrains Rider recommended)
- Latest Version of OneWare Studio

## Install the official templates (NET 8)

```bash
dotnet install -g OneWare.Templates
```

## Create a new Plugin

```bash
dotnet new --TOOD
```

## Run and Debug the Plugin

### Using Rider (recommended)

Open the created template .sln file with Rider.
Once fully loaded, you can create a new run configuration in the `edit Configurations` menu.
You can use add Configuration and add a new configuration with the **.NET Executable** type.

![Rider Run Configuration](img/rider-run-config.png)

There you can set the path to your OneWareStudio Executable.
The Runtime arguments should be `--modules ./`, which means that you are pointing the module to be loaded to your working directory. For this to work you finally need to set the working directory to your plugin folder and adding (`/bin/Debug/net8.0`) so that the working directory is the folder where your plugin gets compiled to. 

If it works you can press on Run and should see that your plugin is loaded.

## API Documentation

The API is not ready yet, same goes for the documention. 
If you still want to experiment with OneWareStudio Plugins, it is recommended to look at the [source code of OneWare Studio](https://github.com/one-ware/OneWare) or see other official examples:

- [OneWare Quartus Extension](https://github.com/one-ware/OneWare.Quartus)
- [OneWare GHDL Extension](https://github.com/one-ware/OneWare.GhdlExtension)
- [OneWare NetlistSVG Extension](https://github.com/one-ware/OneWare.NetlistSVG)

--TODO CHECK LINKS
