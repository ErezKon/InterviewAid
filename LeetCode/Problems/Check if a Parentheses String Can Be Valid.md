# 2116. Check if a Parentheses String Can Be Valid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid](https://leetcode.com/problems/check-if-a-parentheses-string-can-be-valid)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Moloco, Servicenow

---

## Approach: Two-Pass Greedy — O(n) ✅

```
FUNCTION canBeValid(s, locked):
    IF len(s) % 2 != 0: RETURN false

    // Left to right: check we never have too many ')'
    balance = 0
    FOR i ← 0 TO n - 1:
        IF locked[i] == '0' OR s[i] == '(':
            balance += 1
        ELSE:
            balance -= 1
        IF balance < 0: RETURN false

    // Right to left: check we never have too many '('
    balance = 0
    FOR i ← n - 1 DOWN TO 0:
        IF locked[i] == '0' OR s[i] == ')':
            balance += 1
        ELSE:
            balance -= 1
        IF balance < 0: RETURN false

    RETURN true
```
