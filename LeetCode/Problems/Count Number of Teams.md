# 1395. Count Number of Teams

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-number-of-teams](https://leetcode.com/problems/count-number-of-teams)
**Companies:** Amazon, Goldman Sachs, Google, Ibm

---

```
FUNCTION numTeams(rating):
    count = 0
    FOR j ← 1 TO n - 2:
        leftSmaller = SUM(1 for i in range(j) if rating[i] < rating[j])
        rightLarger = SUM(1 for k in range(j+1, n) if rating[k] > rating[j])
        leftLarger = j - leftSmaller
        rightSmaller = (n - j - 1) - rightLarger
        count += leftSmaller * rightLarger + leftLarger * rightSmaller
    RETURN count
```

For each middle element, count valid left × valid right for both increasing and decreasing.
