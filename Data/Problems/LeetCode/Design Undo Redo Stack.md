# Design Pattern: Undo/Redo

---

## Problem Description
Implement an undo/redo system that supports executing commands, undoing the most recent command, and redoing a previously undone command. The system should maintain two stacks: one for undo history and one for redo history. Executing a new command clears the redo stack.

## Examples
```text
undoRedo = UndoRedoStack()
undoRedo.execute(AddCommand(5))   // state: 5
undoRedo.execute(AddCommand(3))   // state: 8
undoRedo.undo()                   // state: 5
undoRedo.redo()                   // state: 8
```
Explanation: After two adds, undo reverts the last add, redo reapplies it.

## Approach
Use the Command pattern. Each command implements `execute()` and `undo()`. The `UndoRedoStack` stores executed commands on `undoStack`. `undo()` pops from `undoStack`, calls `undo()`, and pushes onto `redoStack`. `redo()` does the opposite. Executing a new command clears `redoStack`.

## Pseudocode
```text
CLASS UndoRedoStack:
    CONSTRUCTOR:
        SET undoStack ← empty stack
        SET redoStack ← empty stack

    FUNCTION execute(command):
        command.execute()
        undoStack.PUSH(command)
        redoStack.CLEAR()

    FUNCTION undo():
        IF undoStack IS EMPTY: RETURN
        SET cmd ← undoStack.POP()
        cmd.undo()
        redoStack.PUSH(cmd)

    FUNCTION redo():
        IF redoStack IS EMPTY: RETURN
        SET cmd ← redoStack.POP()
        cmd.execute()
        undoStack.PUSH(cmd)
```

## Walkthrough
| Action | undoStack | redoStack | State change |
|--------|-----------|-----------|--------------|
| execute(Add 5) | [Add5] | [] | +5 |
| execute(Add 3) | [Add5, Add3] | [] | +3 |
| undo() | [Add5] | [Add3] | -3 |
| redo() | [Add5, Add3] | [] | +3 |

## Complexity Analysis
- **Time:** O(1) for each `execute`, `undo`, and `redo` operation.
- **Space:** O(k) where k is the number of executed commands stored in the stacks.

## Follow‑Up Questions
- How would you support batching multiple commands as a single undoable action?
- Can you persist the undo/redo history across application restarts?
- How would you limit memory usage by discarding old history?

## Key Takeaway
Two stacks combined with the Command pattern provide a clean, constant‑time mechanism for reversible operations.
