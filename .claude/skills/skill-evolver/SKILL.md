---
name: skill-evolver
description: Evolve and improve other Claude skills through execution feedback, accumulating patterns from successful runs and refining based on user preferences and validation results
---

# Skill Evolver

A meta-skill that enables **continual learning for Claude skills** through execution feedback. Instead of static instructions, skills become living knowledge bases that improve over time using principles from Agentic Context Engineering (ACE).

## When to Use This Skill

Use Skill Evolver when you want to:

- **Improve an existing skill** through real-world usage and feedback
- **Refine skill instructions** based on execution patterns and outcomes
- **Accumulate domain knowledge** from successful implementations
- **Adapt skills to user preferences** without manual retraining
- **Prevent context collapse** by preserving detailed patterns and learnings

This skill is particularly valuable for skills that:

- Generate code or creative outputs that can be validated
- Have measurable success criteria
- Benefit from iterative refinement
- Need to adapt to specific user preferences or organizational standards

## How It Works

Skill Evolver implements a four-phase evolution loop:

### 1. Generate

Produce multiple candidate solutions using the current skill version. Generate diverse approaches to explore the solution space.

### 2. Execute

Deploy candidates to sandbox environments (e.g., via Daytona) for validation. This provides real execution feedback rather than theoretical assessment.

### 3. Reflect

Analyze what worked, what failed, and why. Extract patterns, edge cases, and refinements from the execution results.

### 4. Curate

Update the skill with new patterns, refinements, and learnings. Preserve detailed knowledge as structured, retrievable patterns—preventing brevity bias and context collapse.

## Evolution Process

### Input Requirements

To evolve a skill, you need:

1. **Target Skill**: The skill to evolve (must have a `SKILL.md` file)
2. **Task/Goal**: A specific task for the skill to perform
3. **Validation Method**: How to evaluate success (sandbox execution, user feedback, automated tests)
4. **Feedback Source**: User preferences, validation results, error logs, or performance metrics

### Evolution Iterations

Each evolution cycle follows this pattern:

**Iteration 0**: Baseline performance with current skill

- Generate initial solutions
- Execute and validate
- Document baseline patterns

**Iteration N**: Refined performance with evolved skill

- Generate solutions using updated skill
- Execute and compare to previous iterations
- Extract new patterns and refinements
- Update skill with accumulated knowledge

### Pattern Accumulation

Unlike traditional prompt optimization (which compresses context), Skill Evolver preserves detailed domain knowledge:

- **Success patterns**: What worked and why
- **Failure patterns**: What failed and how to avoid it
- **Edge cases**: Unusual scenarios and their solutions
- **User preferences**: Style, structure, and quality preferences
- **Domain-specific knowledge**: Technical details, best practices, conventions

## Best Practices

### Skill Evolution Guidelines

1. **Start with clear success criteria**: Define what "better" means before evolving
2. **Generate diverse candidates**: Explore multiple approaches per iteration
3. **Validate thoroughly**: Use real execution environments when possible
4. **Preserve context**: Don't compress learnings—maintain detailed patterns
5. **Version incrementally**: Track changes and allow rollback if needed
6. **Focus on patterns**: Extract reusable knowledge, not one-off fixes

### When NOT to Evolve

Avoid evolving skills when:

- The skill is already performing optimally
- Feedback is inconsistent or unreliable
- The task domain is too broad or undefined
- You lack proper validation mechanisms

## Example Evolution Scenario

**Target Skill**: Frontend design skill  
**Goal**: Create aesthetically pleasing UI for a budgeting app  
**Validation**: User selects favorite design + provides feedback

**Evolution Arc**:

- **Iteration 0**: Generic, template-like design (classic "AI slop")
- **Iteration 1**: Learns user prefers minimalism, specific color palettes, custom spacing
- **Iteration 2**: Produces polished, unique design incorporating accumulated patterns

Each iteration generates 3 design candidates, deploys them to sandboxes, collects user feedback, and updates the skill with new patterns.

## Technical Integration

Skill Evolver works with:

- **Sandbox Environments**: Daytona, Docker, or other execution environments
- **Error Tracking**: Sentry or similar for capturing runtime errors
- **Code Review**: Automated tools like CodeRabbit for quality assessment
- **Observability**: LLM observability platforms like Galileo for performance tracking

## Output Format

When evolving a skill, Skill Evolver updates the skill's `SKILL.md` and related files with:

- **New sections**: Patterns, examples, edge cases
- **Refined instructions**: Improved clarity and specificity
- **Updated examples**: Real-world successful implementations
- **Reference materials**: Links to validation results, user feedback, error logs

## Limitations

- Requires executable validation (can't evolve purely theoretical skills)
- Needs consistent feedback sources
- May accumulate noise if not curated carefully
- Best suited for skills with measurable outcomes

## References

- [Agent Skills Spec](./how-to-build-skills/agent-skills-spec.md)
- [What are Skills](./how-to-build-skills/what-are-skills.md)
- [How to Create Custom Skills](./how-to-build-skills/how-to-create-custom-skills.md)
- [Agentic Context Engineering (ACE)](https://arxiv.org/abs/2510.04618)

---

*Skills as living documentation. Context as capability.*
