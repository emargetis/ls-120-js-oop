/* 
The objects from problems 1 and 2 differ because in problem 2, the objects don't have the 
methods directly on them and instead delegate them to the `petPrototype` object.

LS addition:
Objects created with the factory function can have private state. 
Any state stored in the body of the factory function instead of in the returned
object is private to the returned object. They can't be accessed or modified 
unless one of the object methods exposes the state. With OLOO, there is no way 
to define private state. All object state can be accessed and modified by outside code.
*/