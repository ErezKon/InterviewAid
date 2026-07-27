# 2375. Construct Smallest Number From DI String

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Goldman Sachs, Google
---

```
FUNCTION smallestNumber(pattern):
    stack = []; result = []; num = 1
    FOR i ← 0 TO len(pattern):
        stack.PUSH(num); num += 1
        IF i == len(pattern) OR pattern[i] == 'I':
            WHILE stack: result.ADD(str(stack.POP()))
    RETURN JOIN(result)
```
