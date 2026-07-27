# 282. Expression Add Operators

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/expression-add-operators](https://leetcode.com/problems/expression-add-operators)
**Companies:** Amazon, Bloomberg, Google, Linkedin, Meta, Pinterest, Tiktok

---

## Approach: Backtracking — O(4ⁿ) ✅

```
FUNCTION addOperators(num, target):
    result = []

    FUNCTION backtrack(idx, expr, value, prevOperand):
        IF idx == len(num):
            IF value == target:
                result.ADD(expr)
            RETURN

        FOR i ← idx TO len(num) - 1:
            IF i > idx AND num[idx] == '0': BREAK    // no leading zeros
            curr = int(num[idx:i+1])

            IF idx == 0:
                backtrack(i+1, str(curr), curr, curr)
            ELSE:
                backtrack(i+1, expr+"+"+str(curr), value+curr, curr)
                backtrack(i+1, expr+"-"+str(curr), value-curr, -curr)
                backtrack(i+1, expr+"*"+str(curr), value-prevOperand+prevOperand*curr, prevOperand*curr)

    backtrack(0, "", 0, 0)
    RETURN result
```

Track `prevOperand` to handle multiplication precedence by undoing the last addition.
