# 470. Implement Rand10() Using Rand7()

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/implement-rand10-using-rand7](https://leetcode.com/problems/implement-rand10-using-rand7)
**Companies:** Bloomberg, De Shaw, Google, Linkedin, Microsoft, Tencent, Tiktok, Yandex

---

## Approach: Rejection Sampling — O(1) expected ✅

```
FUNCTION rand10():
    WHILE true:
        // Generate uniform [1, 49]
        num = (rand7() - 1) * 7 + rand7()
        IF num <= 40:
            RETURN (num - 1) % 10 + 1
```

`(rand7()-1)*7 + rand7()` gives uniform [1,49]. Accept [1,40] → map to [1,10]. Reject [41,49] and retry. Expected calls: ~2.4 × rand7().
