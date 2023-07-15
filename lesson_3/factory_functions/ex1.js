/*
Two disadvantages of working with factory functions:
- every object created with a factory functions receives a full copy of all
methods and state properties which can be taxing for system memory.
- it is not possible to determine a "type" of an object by inspecting it. At
best, this can only be determined by manually looking at the methods to see if 
they match the methods of an object type that you know.
*/