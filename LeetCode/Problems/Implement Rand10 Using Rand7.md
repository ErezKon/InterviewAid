# 470. Implement Rand10() Using Rand7()

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-rand10-using-rand7](https://leetcode.com/problems/implement-rand10-using-rand7)
**Companies:** Bloomberg, De Shaw, Google, Linkedin, Microsoft, Tencent, Tiktok, Yandex

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Rejection Sampling — O(1) expected ✅](#3-approach-rejection-sampling--o1-expected-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Implement `rand10()` using only `rand7()`. Each call must return a uniformly random integer in [1, 10].

---

## 2. Key Insight

> `(rand7()-1)*7 + rand7()` generates uniform [1, 49]. Accept [1, 40] and map to [1, 10]. Reject [41, 49] and retry.

---

## 3. Approach: Rejection Sampling — O(1) expected ✅

```
FUNCTION rand10():
    WHILE true:
        // Generate uniform [1, 49]
        num = (rand7() - 1) * 7 + rand7()
        IF num <= 40:
            RETURN (num - 1) % 10 + 1
```

---

## 4. Key Takeaway

> **Rejection sampling**: generate a larger uniform range, accept only multiples of 10. Expected ~2.4 rand7() calls per rand10() call.
