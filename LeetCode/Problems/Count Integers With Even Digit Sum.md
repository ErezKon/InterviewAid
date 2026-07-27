# 2180. Count Integers With Even Digit Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-integers-with-even-digit-sum](https://leetcode.com/problems/count-integers-with-even-digit-sum)
**Companies:** Mindtree

---

## 1. Problem Description

Given a positive integer `num`, count how many integers in `[1, num]` have an even digit sum.

---

## 2. Approach: Iterate and Check — O(n × d) ✅

```
FUNCTION countEven(num):
    count = 0
    FOR i FROM 1 TO num:
        IF SUM(digits of i) % 2 == 0:
            count += 1
    RETURN count
```

Alternatively, O(1) math: roughly half of numbers up to `num` have even digit sum. Check `num`'s own digit sum parity to determine exact count.

```
FUNCTION countEven(num):
    digitSum = SUM(int(d) for d in str(num))
    RETURN num // 2 IF digitSum % 2 == 0 ELSE (num - 1) // 2
```

| Time | Space |
|------|-------|
| O(log num) | O(1) |

---

## Key Takeaway

> Among `[1, num]`, about half have even digit sums. The exact formula depends on the parity of `num`'s own digit sum.
