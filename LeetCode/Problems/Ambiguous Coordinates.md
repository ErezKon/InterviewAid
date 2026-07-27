# 816. Ambiguous Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/ambiguous-coordinates](https://leetcode.com/problems/ambiguous-coordinates)
**Companies:** Google

---

```
FUNCTION ambiguousCoordinates(s):
    s = s[1:-1]    // remove outer parens
    result = []

    FUNCTION validNumbers(sub):
        nums = []
        FOR i ← 1 TO len(sub):
            left, right = sub[:i], sub[i:]
            IF (left == "0" OR NOT left.startswith("0")) AND NOT right.endswith("0"):
                nums.ADD(left + ("." + right IF right ELSE ""))
        RETURN nums

    FOR i ← 1 TO len(s) - 1:
        FOR x IN validNumbers(s[:i]):
            FOR y IN validNumbers(s[i:]):
                result.ADD(f"({x}, {y})")

    RETURN result
```
