# Design Pattern: Undo/Redo

Common in design problems and system design interviews.

---

## Template

```
CLASS UndoRedoStack:
    CONSTRUCTOR:
        undoStack = []
        redoStack = []

    FUNCTION execute(command):
        command.execute()
        undoStack.PUSH(command)
        redoStack.CLEAR()     // new action invalidates redo

    FUNCTION undo():
        IF undoStack is empty: RETURN
        command = undoStack.POP()
        command.undo()
        redoStack.PUSH(command)

    FUNCTION redo():
        IF redoStack is empty: RETURN
        command = redoStack.POP()
        command.execute()
        undoStack.PUSH(command)
```

---

## Key Takeaway

> Command pattern + two stacks. Execute pushes to undo stack and clears redo. Undo pops from undo, pushes to redo. Redo does the reverse.
