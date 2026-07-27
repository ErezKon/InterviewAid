# Stack Design Patterns

Related: #155 Min Stack, #232 Queue using Stacks, #225 Stack using Queues, #895 Max Freq Stack

---

## Min/Max Stack Template

```
CLASS MinStack:
    stack = []       // (value, currentMin)

    push(val): stack.PUSH((val, MIN(val, getMin())))
    pop():     stack.POP()
    top():     RETURN stack.TOP().value
    getMin():  RETURN stack.TOP().currentMin IF stack ELSE infinity
```

Each element stores the min at the time of insertion. O(1) for all operations.

### Variant: MinQueue

Use two stacks (push and pop stacks), each maintaining min. MinQueue.getMin() = min of both stacks' mins.
