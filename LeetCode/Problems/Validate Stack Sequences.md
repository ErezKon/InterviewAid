# 946. Validate Stack Sequences

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/validate-stack-sequences](https://leetcode.com/problems/validate-stack-sequences)
**Companies:** Amazon, Google, Linkedin, Meta, Microsoft, Sprinklr

---

```
FUNCTION validateStackSequences(pushed, popped):
    stack = []
    j = 0
    FOR val IN pushed:
        stack.PUSH(val)
        WHILE stack AND stack[-1] == popped[j]:
            stack.POP()
            j += 1
    RETURN j == len(popped)
```

Simulate: push each element, then pop while top matches the next expected pop.
