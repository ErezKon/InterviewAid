# 1203. Sort Items by Groups Respecting Dependencies

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies](https://leetcode.com/problems/sort-items-by-groups-respecting-dependencies)
**Companies:** Amazon, Bloomberg, Citadel, Google, Meta

---

## Problem Description

Given `n` items belonging to groups with dependencies between items, sort all items so that group members are contiguous and all dependency constraints are satisfied. Return empty array if impossible.

### Examples

- **Input:** `n=8, m=2, group=[-1,-1,1,0,0,1,0,-1], beforeItems=[[],[6],[5],[6],[3,6],[],[],[]]` → **Output:** `[6,3,4,1,5,2,0,7]`

## Approach: Two-Level Topological Sort — O(V+E) ✅

**Key Insight:** Assign ungrouped items their own group. Build both item-level and group-level DAGs. Topological sort both; if either has a cycle, return [].

```
FUNCTION sortItems(n, m, group, beforeItems):
    // Assign ungrouped items their own group
    FOR i where group[i] == -1: group[i] = m; m += 1

    // Build item-level and group-level graphs
    // Topological sort groups, then items within each group
    groupOrder = topSort(group graph)
    IF cycle: RETURN []

    itemOrder = topSort(item graph within each group)
    IF cycle: RETURN []

    // Assemble: for each group in order, output items in order
    RETURN assembled result
```

### Complexity

| | |
|---|---|
| **Time** | O(V + E) |
| **Space** | O(V + E) |
