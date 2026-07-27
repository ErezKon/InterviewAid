# 803. Bricks Falling When Hit

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/bricks-falling-when-hit](https://leetcode.com/problems/bricks-falling-when-hit)
**Companies:** Google, Phonepe, Snapchat

---

## Approach: Reverse Union-Find — O(mn·α) ✅

```
// Process hits in reverse order
// Start with final grid state, add bricks back
// Use Union-Find to track connected components to top row
// When adding brick, count newly stable bricks
```
