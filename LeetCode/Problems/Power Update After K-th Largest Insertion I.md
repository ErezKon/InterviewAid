# 3935. Power Update After K-th Largest Insertion I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i](https://leetcode.com/problems/power-update-after-k-th-largest-insertion-i)
**Companies:** Google

---

## Problem Description
You are given an initially empty multiset. You will receive a sequence of operations: insert a number into the set, and after each insertion report the K‑th largest element in the current set (or -1 if the set size is less than K). Return the list of reported values.

## Examples
**Example 1:**
Input: `operations = ["add",1], ["add",5], ["add",2], ["add",4]`, `K = 2`
Output: `[-1,1,2,4]`
Explanation: After first insertion size<2 → -1; after second largest is 1; after third largest is 2; after fourth largest is 4.

**Example 2:**
Input: `operations = [["add",3]], K = 1`
Output: `[3]`
Explanation: The 1‑st largest is the only element.

## Approach
Maintain two heaps:
1. **minHeap** of size K storing the K largest elements (top is K‑th largest).
2. **maxHeap** for the remaining smaller elements.
When inserting a value:
- If minHeap size < K, push into minHeap.
- Else compare with minHeap top; if larger, move top to maxHeap and push new value into minHeap; otherwise push directly into maxHeap.
After each insertion, if minHeap size == K, answer is its top; else -1.

## Walkthrough
| Step | Inserted | minHeap (size K) | maxHeap | Report |
|------|----------|------------------|---------|--------|
|1|1|[1]|[]| -1 |
|2|5|[1,5] (top 1)|[]| 1 |
|3|2|[2,5] (top 2) after moving 1 to maxHeap|[1]| 2 |
|4|4|[4,5] (top 4) after moving 2 to maxHeap|[1,2]| 4 |

## Complexity Analysis
Time per insertion: O(log K) for heap operations.
Space: O(K) for minHeap + O(N‑K) for maxHeap (overall O(N)).

## Follow-Up Questions
1. How would you support deletions of arbitrary elements?
2. Can you achieve O(1) query time with a balanced BST?
3. Extend to support multiple different K values simultaneously.

## Key Takeaway
Using a min‑heap of size K efficiently tracks the K‑th largest element in a dynamic stream.
