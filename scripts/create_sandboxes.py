from daytona_client import daytona

def create_sandboxes():
    """
    Create a sandbox for the user's request.
    """
    
    sandboxes = []
    print("Creating sandboxes...")
    print("\n")
    
    for i in range(3):
        print(f"Creating sandbox {i+1}...")
        sandbox = daytona.create()
        sandboxes.append(sandbox)
        print(f"Sandbox {i+1} created successfully")
        print("\n")

    return sandboxes


sandboxes = create_sandboxes()
print(sandboxes)


# session id
# git clone
# git checkout -b feature/session-id-variation-1
# Temporarily remove claude.md and evolver skill
# claude code agents sdk should use the frontend design skill to work on the variation_1
# git push the branches
# get the server up in the sandbox
# get a preview link from each sandbox
# 
