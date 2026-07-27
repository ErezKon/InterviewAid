# 860. Lemonade Change

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lemonade-change](https://leetcode.com/problems/lemonade-change)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zalando, Zoho

---

## 1. Problem Description

Each customer pays $5, $10, or $20 for a $5 lemonade. Return whether you can provide correct change to every customer (starting with no bills).

---

## 2. Approach: Greedy — O(n) ✅

```
FUNCTION lemonadeChange(bills):
    fives = tens = 0
    FOR bill IN bills:
        IF bill == 5: fives += 1
        ELSE IF bill == 10: fives -= 1; tens += 1
        ELSE IF tens > 0: tens -= 1; fives -= 1
        ELSE: fives -= 3
        IF fives < 0: RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Greedy: for $20, prefer giving a $10+$5 over three $5s (preserve flexibility). Track only $5 and $10 counts.
