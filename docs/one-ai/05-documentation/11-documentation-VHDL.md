---
id: documentation-vhdl
title: VHDL Documentation
sidebar_label: VHDL Documentation
---

# The OneWare VHDL Code

When exporting your trained model you have the option to export as a VHDL project for an FPGA. Aside from the model itself this project contains also the VHDL code necessary to run your model. This page gives you the necessary information to integrate your OneAI model into your FPGA project.

# Export Project Content

The VHDL export gives you a folder with the following content:
- ``Core`` Contains helper modules concerning ANN-architecture.
- ``Filters`` Contains helper modules for data preprocessing.
- ``ONEAI_Confic_Package.vhd`` Configuration settings.
- ``ONEAI_Data_Package.vhd`` The model weights.
- ``ONEAI_Simulation.vhd`` A VHDL file you can use to simulate the model.
- ``ONEAI_Top.vhd`` The top level design entity you need to integrate into your project.
- ``Test_Data_Package.vhd`` Test data for simulation.

# Core Concept: Stream

All modules of the OneAI-code make use of streams. These are a signal type, used to pass data into and throughout the ANN in VHDL. The stream type ``CNN_Stream_T`` is defined in the file ``ONEAI_Confic_Package.vhd``. Streams implement the following signals:

- ``Data_CLK`` Design clock
- ``Data_Valid`` Indicator that data is valid
- ``Column`` Current pixel column
- ``Row`` Current pixel row
- ``Filter`` Current pixel filter (relevant for convolution, for the input of the ANN usually leave this at ``0``)

This is paired with a ``Data`` signal consisting of n-dimensions depending on the images colour channels. Each channel is a 7-bit unsigned signal encoding the respecting pixel value in the range 0...127.

# Simulation

For simulation purposes you can simply use the ``ONEAI_Simulation`` module as the top level entity.

![ModelSim Simulation Start](/img/ai/one_ai_plugin/documentation/vhdl_simulation_start.png)

This simulation module will take example data included in the ``Test_Data_Package.vhd`` and run it through the model. Here you have the oportunity to verify correct inputs (``iStream``) and the output produced by the ANN (``oStream``).

![ModelSim iStream Wave](/img/ai/one_ai_plugin/documentation/vhdl_simulation_iStream.png)
![ModelSim oStream Wave](/img/ai/one_ai_plugin/documentation/vhdl_simulation_oStream.png)


# Implementation

When including the OneAI model into your FPGA project simply include the ``ONEAI_Top.vhd`` module ``CNN`` into your design. The module has one input stream and one output stream with a data signal each:

- ``iStream`` Input stream
- ``iData_1`` Input data (n-channel)
- ``oStream_1`` Output stream
- ``oData_1`` Output data (n-channel)
- ``oCycle_1`` Current output cycle

The output of the ``CNN``-module adheres to the stream format as well. For classifiers the output data is the confidence for each of the classes. As there is only one output data channel, the confidences for each class are given out in consecutive clock cycles. The current cycle is indicated by the ``oCycle_1`` signal. The confidence is encoded as a 7-bit usinged integer from the ``oData_1`` signal. A percentage based confidence can be derived by dividing this value by 1.27 in the postprocessing.

Example instantiation of the ``CNN``-module (assuming 3-channel RBG input):

```vhdl
COMPONENT CNN
	PORT (
		iStream       : IN CNN_Stream_T;
		iData_1       : IN CNN_Values_T(2 downto 0);
		oStream_1     : OUT CNN_Stream_T;
		oData_1       : OUT CNN_Values_T(0 downto 0);
		oCycle_1      : OUT NATURAL
	);
END COMPONENT;
```

Note that the ``CNN``-module needs a 1 ms warmup after the reset release, before any input is processed.


