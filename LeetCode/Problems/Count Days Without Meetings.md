# 3169. Count Days Without Meetings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-days-without-meetings](https://leetcode.com/problems/count-days-without-meetings)
**Companies:** Amazon, Google, Microsoft, Swiggy

---

```
FUNCTION countDays(days, meetings):
    SORT meetings
    free = 0; end = 0
    FOR [s, e] IN meetings:
        IF s > end + 1: free += s - end - 1
        end = MAX(end, e)
    free += days - end
    RETURN free
```
