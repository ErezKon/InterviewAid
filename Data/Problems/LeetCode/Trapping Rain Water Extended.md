# Two Pointer Patterns

Related: #11, #42, #167, #15, #16, #75

---

## Problem Description
This document summarizes common **two‑pointer** techniques used in array problems. The patterns describe how to move one or more pointers through a data structure to achieve linear‑time solutions for tasks such as finding pairs, removing duplicates, or maintaining sliding windows.

## Examples
**Opposite Ends:** Find a pair that sums to a target in a sorted array (Two Sum II), compute container water area, or calculate trapped rain water.

**Same Direction (Fast/Slow):** Detect cycles in linked lists, remove duplicates from sorted arrays, or move zeroes to the end.

**Sliding Window:** Determine the minimum window substring containing all required characters, or find the longest substring without repeating characters.

**Three Pointers:** Solve 3‑Sum or implement the Dutch National Flag algorithm.

## Approach
Select the appropriate pointer movement based on the problem’s structure:
- **Sorted/Monotonic data:** Use opposite‑end pointers, shrinking the window from both sides.
- **Sequential traversal:** Use fast and slow pointers to compare elements at different speeds.
- **Dynamic range:** Use a sliding window where the left pointer follows the right pointer to maintain a valid subarray.
- **Multiple dimensions:** Use three pointers to partition or combine elements.

## Walkthrough
| Pattern | Typical Steps |
|---------|----------------|
| Opposite Ends | Initialize `left←0`, `right←n‑1`; while `left<right` compare and move the pointer with the less promising value. |
| Fast/Slow | Initialize `slow←head`, `fast←head`; advance `fast` twice as fast as `slow` to detect cycles or skip elements. |
| Sliding Window | Expand `right` to include elements; while constraint violated, increment `left`. |
| Three Pointers | Use `i`, `j`, `k` to iterate and partition based on conditions. |

## Complexity Analysis
All patterns run in **O(n)** time with **O(1)** extra space (excluding output), because each pointer moves at most linearly through the input.

## Follow‑Up Questions
1. How would you adapt opposite‑end pointers for unsorted arrays?
2. Can fast/slow pointers be used to find the middle of a linked list without extra memory?
3. What are the trade‑offs between sliding‑window and two‑pointer approaches for variable‑size windows?

## Key Takeaway
Two‑pointer techniques transform many seemingly quadratic problems into linear solutions by judiciously moving one or more pointers based on problem constraints.
