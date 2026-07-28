# 860. Lemonade Change

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/lemonade-change](https://leetcode.com/problems/lemonade-change)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zalando, Zoho

---

## 1. Problem Description

Each customer pays $5, $10, or $20 for a $5 lemonade. Return whether you can provide correct change to every customer (starting with no bills).

---

## 2. Examples

| bills | expected |
|-------|----------|
| [5,5,5,10,20] | true |
| [5,5,10,10,20] | false |

*Explanation*: In the first case, change can be given to every customer. In the second case, the last $20 cannot be given change because there are no $5 bills left.

---

## 3. Approach: Greedy — O(n) ✅

```text
FUNCTION lemonadeChange(bills):
    // Track count of $5 and $10 bills
    SET fives ← 0
    SET tens ← 0
    FOR bill IN bills:
        IF bill == 5:
            SET fives ← fives + 1
        ELSE IF bill == 10:
            SET fives ← fives - 1
            SET tens ← tens + 1
        ELSE IF bill == 20:
            IF tens > 0:
                SET tens ← tens - 1
                SET fives ← fives - 1
            ELSE:
                SET fives ← fives - 3
        IF fives < 0:
            RETURN false
    RETURN true
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 4. Walkthrough

| Step | bill | fives | tens | Action |
|------|------|-------|------|--------|
| 1 | 5 | 1 | 0 | Accept $5, no change needed |
| 2 | 5 | 2 | 0 | Accept $5 |
| 3 | 5 | 3 | 0 | Accept $5 |
| 4 | 10 | 2 | 1 | Give one $5 as change |
| 5 | 20 | 1 | 0 | Give one $10 and one $5 as change |

All customers received correct change, so the function returns **true**.

---

## 5. Complexity Analysis

- **Time:** O(n) – one pass through the bills array.
- **Space:** O(1) – only two counters are used.

---

## 6. Follow-Up Questions

- How would the solution change if the lemonade price were not fixed at $5?
- Could you extend the algorithm to handle arbitrary bill denominations?
- What if you needed to minimize the total number of bills given as change?

---

## 7. Key Takeaway

> Greedy: for $20, prefer giving a $10+$5 over three $5s (preserve flexibility). Track only $5 and $10 counts.
