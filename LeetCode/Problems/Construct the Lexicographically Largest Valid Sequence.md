# 1718. Construct the Lexicographically Largest Valid Sequence

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence](https://leetcode.com/problems/construct-the-lexicographically-largest-valid-sequence)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION constructDistancedSequence(n):
    size = 2 * n - 1
    result = [0] * size
    used = set()

    FUNCTION backtrack(idx):
        IF idx == size: RETURN true
        IF result[idx] != 0: RETURN backtrack(idx + 1)

        FOR num ← n DOWN TO 1:
            IF num IN used: CONTINUE
            IF num == 1:
                result[idx] = 1; used.ADD(1)
                IF backtrack(idx + 1): RETURN true
                result[idx] = 0; used.REMOVE(1)
            ELSE IF idx + num < size AND result[idx + num] == 0:
                result[idx] = result[idx + num] = num; used.ADD(num)
                IF backtrack(idx + 1): RETURN true
                result[idx] = result[idx + num] = 0; used.REMOVE(num)

        RETURN false

    backtrack(0)
    RETURN result
```
