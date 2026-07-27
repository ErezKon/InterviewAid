# 881. Boats to Save People

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/boats-to-save-people](https://leetcode.com/problems/boats-to-save-people)
**Companies:** Amazon, Atlassian, Bloomberg, Flipkart, Google, Ibm, Meta, Microsoft, Sigmoid, Snowflake, Uipath

---

## Approach: Sort + Two Pointers — O(n log n) ✅

```
FUNCTION numRescueBoats(people, limit):
    SORT people
    lo, hi = 0, len(people) - 1
    boats = 0

    WHILE lo <= hi:
        IF people[lo] + people[hi] <= limit:
            lo += 1
        hi -= 1
        boats += 1

    RETURN boats
```

Pair heaviest with lightest if possible. At most 2 people per boat.
