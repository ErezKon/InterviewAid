# 1773. Count Items Matching a Rule

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-items-matching-a-rule](https://leetcode.com/problems/count-items-matching-a-rule)
**Companies:** Amazon, Google, Meta

---

## Problem Description
You are given a list of `items`, where each item is a list `[type, color, name]`. Also given a `ruleKey` (one of "type", "color", "name") and a `ruleValue`. Return the number of items that satisfy the rule `item[ruleKey] == ruleValue`.

## Examples
**Example 1**
```
Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]],
       ruleKey = "color", ruleValue = "silver"
Output: 1
Explanation: Only the second item has color "silver".
```
**Example 2**
```
Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]],
       ruleKey = "type", ruleValue = "phone"
Output: 2
Explanation: The first and third items are of type "phone".
```

## Approach
Map the `ruleKey` to its index in the item list (type→0, color→1, name→2). Then iterate through `items`, counting those whose element at that index equals `ruleValue`.

```text
FUNCTION countMatches(items, ruleKey, ruleValue):
    // Determine which column to check
    IF ruleKey = "type":
        SET idx ← 0
    ELSE IF ruleKey = "color":
        SET idx ← 1
    ELSE:
        SET idx ← 2
    SET count ← 0
    FOR each item IN items:
        IF item[idx] = ruleValue:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
For the first example, `ruleKey` is "color" → `idx = 1`. Scan each item:
- Item 0: "blue" ≠ "silver" → no count.
- Item 1: "silver" = "silver" → count = 1.
- Item 2: "gold" ≠ "silver" → no change.
Result = 1.

## Complexity Analysis
- **Time:** O(m) where *m* is the number of items.
- **Space:** O(1) extra space.

## Follow‑Up Questions
1. How would you handle a large dataset that cannot fit into memory?
2. Can you extend the solution to support multiple rules combined with AND/OR logic?
3. What if the rule keys are dynamic and not limited to the three known fields?

## Key Takeaway
A simple index mapping lets you filter items in a single linear pass.
