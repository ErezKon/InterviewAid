# 1773. Count Items Matching a Rule

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-items-matching-a-rule](https://leetcode.com/problems/count-items-matching-a-rule)
**Companies:** Amazon, Google, Meta

---

## Problem Description
You are given an array `items`, where each `items[i] = [type_i, color_i, name_i]` describes the type, color, and name of the `i`-th item. You are also given a rule represented by two strings, `ruleKey` and `ruleValue`.

The `i`-th item is said to match the rule if **one** of the following is true:

- `ruleKey == "type"` and `ruleValue == type_i`.
- `ruleKey == "color"` and `ruleValue == color_i`.
- `ruleKey == "name"` and `ruleValue == name_i`.

Return *the number of items that match the given rule*.

**Constraints:**
- `1 <= items.length <= 10^4`
- `1 <= type_i.length, color_i.length, name_i.length, ruleValue.length <= 10`
- `ruleKey` is equal to either `"type"`, `"color"`, or `"name"`.
- All strings consist only of lowercase letters.

## Examples
```
Example 1:
  Input: items = [["phone","blue","pixel"],["computer","silver","lenovo"],["phone","gold","iphone"]], ruleKey = "color", ruleValue = "silver"
  Output: 1
  Explanation: There is only one item matching the given rule, which is ["computer","silver","lenovo"].
```

```
Example 2:
  Input: items = [["phone","blue","pixel"],["computer","silver","phone"],["phone","gold","iphone"]], ruleKey = "type", ruleValue = "phone"
  Output: 2
  Explanation: There are only two items matching the given rule, which are ["phone","blue","pixel"] and ["phone","gold","iphone"]. Note that the item ["computer","silver","phone"] does not match.
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
