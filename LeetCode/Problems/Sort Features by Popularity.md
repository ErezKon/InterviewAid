# 1772. Sort Features by Popularity

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sort-features-by-popularity](https://leetcode.com/problems/sort-features-by-popularity)
**Companies:** Amazon

---

## Problem Description

Given a list of features and a list of responses (strings), sort features by the number of responses that mention each feature (descending). Maintain original order for ties.

### Examples

- **Input:** `features = ["cooler","lock","hierarchical"], responses = ["]` → **Output:** sorted by mention count

## Approach: Count + Stable Sort — O(n · m) ✅

```
FUNCTION sortFeatures(features, responses):
    count = {}
    FOR feature IN features:
        count[feature] = 0
    FOR response IN responses:
        words = SET(response.split())
        FOR feature IN features:
            IF feature IN words:
                count[feature] += 1
    // Stable sort descending by count preserves original order for ties
    RETURN SORT(features, key=lambda f: -count[f], stable=true)
```

### Complexity

| | |
|---|---|
| **Time** | O(n · m + n log n) |
| **Space** | O(n + m) |
