# 2073. Time Needed to Buy Tickets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/time-needed-to-buy-tickets](https://leetcode.com/problems/time-needed-to-buy-tickets)
**Companies:** Amazon, Bloomberg, Google, Innovaccer, Meta, Microsoft, Twitter, Uber

---

```
FUNCTION timeRequiredToBuy(tickets, k):
    time = 0
    FOR i, t IN enumerate(tickets):
        IF i <= k:
            time += MIN(t, tickets[k])
        ELSE:
            time += MIN(t, tickets[k] - 1)
    RETURN time
```

People before k buy `min(their tickets, tickets[k])`. People after k buy `min(their tickets, tickets[k]-1)`.
