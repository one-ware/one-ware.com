---
id: documentation-cpp-api
title: C++-API Documentation
sidebar_label: C++ API
---

# The OneWare C++-API

This section provides information on how to use the C++-API after you exported our AI as a C++-project. This documentation assumes you have basic knowledge of how to work with a C++-project. Additional information about the project structure can be found in the readme file. An exemplary usage of the API is shown in the provided main.cpp. The main steps in your C++ code to run inference using the API are:
- Include the API h-file (``OneAPI.h``)
- Initialize the API (only needed once)
- Set the image path
- Run the model
- Retrieve the result

During initialization the API reads the config.txt in the root directory. In order to run inference on an image, an image file is read from memory. The path of the image file is set either during initialization via the config.txt or at runtime. The inference result can be retrieved via several functions. One option is to get a JSON object. This then contains two values, one being the file path of the image fed to the model the other being the result of the inference. The JSON object can also be written to memory for external use.

## config.txt

The config.txt defines parameters for the API. Parameters are each encoded as one line with ``<var_name>=<value>``. Relative paths encoded this way assume the location of the main binary as their origin.
Parameters:
- ``model_path``: Path to the model file.
- ``image_dir``: Path to the directory containing images for inference. Can be set at runtime.
- ``image_name``: Name of an images for inference. Can be set at runtime.
- ``out_file``: Name (or path including the name) of the output JSON file.

The config.txt needs to be placed in the same directory as the main binary.

## API Functions

- ``int init()``
 Initializes the API. Mandatory to call before doing any inference.
 This funtion loads the configuration in the config.txt file in the root directory, loads the therein specified model file and initializes the tensorflow runtime with the model.

- ``int call(const std::string& file_path)``
 Runs inference on the model with the image in the given file path.
 Expects an OpenCV-readable image file at the given path.
 Returns 0 on success, -1 on failure.
 Output of the model is stored in the API. To access the output call ``get_output_json()`` or ``get_output_vec()`` or ``update_output_json_file()``.

- ``int call()``
 Calls ``call(const std::string& file_path)`` with the default file path. The default file path is read from config.txt at initialization and can be altered at runtime with ``set_file_path/_name()``.
 Returns 0 on success, -1 on failure.

- ``void set_file_path(const std::string& file_path)``
 Sets the default file path for inference.
 This overrides the default file path set in the config.txt.

- ``void set_file_name(const std::string& file_name)``
 Sets the default file path for inference using default directory from config.txt and the given file name.
 This overrides the default file name set in the config.txt.

- ``void update_output_json_file()``
 Writes the output JSON to the file specified in the config.txt.
 The output JSON contains the output vector and the filename of the input image.

- ``nlohmann::json get_output_json()``
 Returns the output JSON object.
 The output JSON contains the output vector and the filename of the input image.

- ``std::vector<float> get_output_vec_float()``
 Returns the output vector as float.

- ``std::vector<int> get_output_vec_quantized()``
 Returns the output vector as int.
 
## API Usage example

Here is some example code to run inference on an image provided at `./data/test.jpg`.

```cpp
int main() {
	std::string file_path = "./data/test.jpg"

	\\Initialize One API
	if (init() != 0) {
		std::cerr << "Initialization failed" << std::endl;
		return -1;
	}

	\\Run inference
	if (call(file_path) != 0) {
		std::cerr << "Inference failed" << std::endl;
		return -1;
	}

	\\Print result
	std::cout << "Result of " << file_path << ": ";
	for (auto i: get_output_vec_float())
		std::cout << i << '|';
	std::cout << std::endl;

	return 0;
}
```
