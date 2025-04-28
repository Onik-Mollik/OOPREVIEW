document.getElementById('load-algorithm').addEventListener('click', function () {
    const algorithm = document.getElementById('algorithm-selector').value;
    const formContainer = document.getElementById('algorithm-form');
    const resultContainer = document.getElementById('algorithm-result');

    formContainer.innerHTML = ''; // Clear previous content
    resultContainer.innerHTML = ''; // Clear previous 
    // Load the appropriate form based on the selected algorithm
    if (algorithm === 'fcfs') {
        loadFCFSForm(formContainer, resultContainer);
    } else if (algorithm === 'priority-non-preemptive') {
        loadPriorityForm(formContainer, resultContainer, false);
    } else if (algorithm === 'priority-preemptive') {
        loadPriorityForm(formContainer, resultContainer, true);
    } else if (algorithm === 'sjf-non-preemptive') {
        loadSJFForm(formContainer, resultContainer, false);
    } else if (algorithm === 'sjf-preemptive') {
        loadSJFForm(formContainer, resultContainer, true);
    } else if (algorithm === 'round-robin') {
        loadRoundRobinForm(formContainer, resultContainer);
    } else if (algorithm === 'bankers') {
        loadBankersForm(formContainer, resultContainer);
    } else if (algorithm === 'sstf') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'sstf');
    } else if (algorithm === 'fcfs-disk') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'fcfs-disk');
    } else if (algorithm === 'scan') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'scan');
    } else if (algorithm === 'cscan') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'cscan');
    } else if (algorithm === 'look') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'look');
    } else if (algorithm === 'clook') {
        loadDiskSchedulingForm(formContainer, resultContainer, 'clook');
    } else if (algorithm === 'fifo' || algorithm === 'lru' || algorithm === 'optimal') {
        loadPageReplacementForm(formContainer, resultContainer, algorithm);
    } else if (algorithm === 'best' || algorithm === 'worst' || algorithm === 'first') {
        loadMemoryAllocationForm(formContainer, resultContainer, algorithm);
    }
});

// FCFS Form
function loadFCFSForm(formContainer, resultContainer) {
    formContainer.innerHTML = `
        <h3>FCFS (First-Come-First-Serve)</h3>
        <form id="fcfs-form">
            <label for="processes">Enter number of processes:</label>
            <input type="number" id="processes" min="1" required>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('fcfs-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numProcesses = parseInt(document.getElementById('processes').value);
        loadProcessDetailsForm(numProcesses, resultContainer, calculateFCFS);
    });
}

// Process Details Form (used by multiple algorithms)
function loadProcessDetailsForm(numProcesses, resultContainer, calculateFunction) {
    let formHTML = '<h3>Enter Process Details</h3><form id="process-details-form">';
    for (let i = 1; i <= numProcesses; i++) {
        formHTML += `
            <h4>Process ${i}</h4>
            <label for="arrival-time-${i}">Arrival Time:</label>
            <input type="number" id="arrival-time-${i}" required>
            <label for="burst-time-${i}">Burst Time:</label>
            <input type="number" id="burst-time-${i}" required>
        `;
    }
    formHTML += '<button type="submit">Calculate</button></form>';
    resultContainer.innerHTML = formHTML;

    document.getElementById('process-details-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const processes = [];
        for (let i = 1; i <= numProcesses; i++) {
            processes.push({
                id: i,
                arrivalTime: parseInt(document.getElementById(`arrival-time-${i}`).value),
                burstTime: parseInt(document.getElementById(`burst-time-${i}`).value),
            });
        }
        calculateFunction(processes, resultContainer);
    });
}

// FCFS Calculation
function calculateFCFS(processes, resultContainer) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;
    let resultHTML = '<h3>FCFS Results</h3><table border="1"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>';

    processes.forEach(process => {
        if (currentTime < process.arrivalTime) {
            currentTime = process.arrivalTime;
        }
        const waiting = currentTime - process.arrivalTime;
        const turnaround = waiting + process.burstTime;
        waitingTime += waiting;
        turnaroundTime += turnaround;
        currentTime += process.burstTime;

        resultHTML += `<tr><td>P${process.id}</td><td>${process.arrivalTime}</td><td>${process.burstTime}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;
    });

    resultHTML += '</table>';
    resultHTML += `<p>Average Waiting Time: ${(waitingTime / processes.length).toFixed(2)}</p>`;
    resultHTML += `<p>Average Turnaround Time: ${(turnaroundTime / processes.length).toFixed(2)}</p>`;
    resultContainer.innerHTML = resultHTML;
}

// Priority Scheduling Form
function loadPriorityForm(formContainer, resultContainer, isPreemptive) {
    formContainer.innerHTML = `
        <h3>Priority Scheduling (${isPreemptive ? 'Preemptive' : 'Non-Preemptive'})</h3>
        <form id="priority-form">
            <label for="processes">Enter number of processes:</label>
            <input type="number" id="processes" min="1" required>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('priority-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numProcesses = parseInt(document.getElementById('processes').value);
        loadProcessDetailsWithPriorityForm(numProcesses, resultContainer, isPreemptive, calculatePriority);
    });
}

// Process Details with Priority Form
function loadProcessDetailsWithPriorityForm(numProcesses, resultContainer, isPreemptive, calculateFunction) {
    let formHTML = '<h3>Enter Process Details</h3><form id="process-details-form">';
    for (let i = 1; i <= numProcesses; i++) {
        formHTML += `
            <h4>Process ${i}</h4>
            <label for="arrival-time-${i}">Arrival Time:</label>
            <input type="number" id="arrival-time-${i}" required>
            <label for="burst-time-${i}">Burst Time:</label>
            <input type="number" id="burst-time-${i}" required>
            <label for="priority-${i}">Priority:</label>
            <input type="number" id="priority-${i}" required>
        `;
    }
    formHTML += '<button type="submit">Calculate</button></form>';
    resultContainer.innerHTML = formHTML;

    document.getElementById('process-details-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const processes = [];
        for (let i = 1; i <= numProcesses; i++) {
            processes.push({
                id: i,
                arrivalTime: parseInt(document.getElementById(`arrival-time-${i}`).value),
                burstTime: parseInt(document.getElementById(`burst-time-${i}`).value),
                priority: parseInt(document.getElementById(`priority-${i}`).value),
            });
        }
        calculateFunction(processes, resultContainer, isPreemptive);
    });
}

// Priority Calculation
function calculatePriority(processes, resultContainer, isPreemptive) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;
    let resultHTML = `<h3>Priority Scheduling Results (${isPreemptive ? 'Preemptive' : 'Non-Preemptive'})</h3><table border="1"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Priority</th><th>Waiting Time</th><th>Turnaround Time</th></tr>`;

    let remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));

    while (remainingProcesses.length > 0) {
        let nextProcess = remainingProcesses
            .filter(p => p.arrivalTime <= currentTime)
            .sort((a, b) => a.priority - b.priority)[0];

        if (!nextProcess) {
            currentTime++;
            continue;
        }

        if (!isPreemptive) {
            const waiting = currentTime - nextProcess.arrivalTime;
            const turnaround = waiting + nextProcess.burstTime;
            waitingTime += waiting;
            turnaroundTime += turnaround;
            currentTime += nextProcess.burstTime;

            resultHTML += `<tr><td>P${nextProcess.id}</td><td>${nextProcess.arrivalTime}</td><td>${nextProcess.burstTime}</td><td>${nextProcess.priority}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;

            remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);
        }
        else {
            nextProcess.remainingTime--;
            currentTime++;

            if (nextProcess.remainingTime === 0) {
                const waiting = currentTime - nextProcess.arrivalTime - nextProcess.burstTime;
                const turnaround = waiting + nextProcess.burstTime;
                waitingTime += waiting;
                turnaroundTime += turnaround;

                resultHTML += `<tr><td>P${nextProcess.id}</td><td>${nextProcess.arrivalTime}</td><td>${nextProcess.burstTime}</td><td>${nextProcess.priority}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;

                remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);
            }
        }
    }

    resultHTML += '</table>';
    resultHTML += `<p>Average Waiting Time: ${(waitingTime / processes.length).toFixed(2)}</p>`;
    resultHTML += `<p>Average Turnaround Time: ${(turnaroundTime / processes.length).toFixed(2)}</p>`;
    resultContainer.innerHTML = resultHTML;
}

// SJF Form
function loadSJFForm(formContainer, resultContainer, isPreemptive) {
    formContainer.innerHTML = `
        <h3>SJF Scheduling (${isPreemptive ? 'Preemptive' : 'Non-Preemptive'})</h3>
        <form id="sjf-form">
            <label for="processes">Enter number of processes:</label>
            <input type="number" id="processes" min="1" required>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('sjf-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numProcesses = parseInt(document.getElementById('processes').value);
        loadProcessDetailsForm(numProcesses, resultContainer, (processes, resultContainer) => {
            calculateSJF(processes, resultContainer, isPreemptive);
        });
    });
}

// SJF Calculation
function calculateSJF(processes, resultContainer, isPreemptive) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;
    let resultHTML = `<h3>SJF Results (${isPreemptive ? 'Preemptive' : 'Non-Preemptive'})</h3><table border="1"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>`;

    let remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));

    while (remainingProcesses.length > 0) {
        let nextProcess = remainingProcesses
            .filter(p => p.arrivalTime <= currentTime)
            .sort((a, b) => a.remainingTime - b.remainingTime)[0];

        if (!nextProcess) {
            currentTime++;
            continue;
        }

        if (!isPreemptive) {
            const waiting = currentTime - nextProcess.arrivalTime;
            const turnaround = waiting + nextProcess.burstTime;
            waitingTime += waiting;
            turnaroundTime += turnaround;
            currentTime += nextProcess.burstTime;

            resultHTML += `<tr><td>P${nextProcess.id}</td><td>${nextProcess.arrivalTime}</td><td>${nextProcess.burstTime}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;

            remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);
        }
        else {
            nextProcess.remainingTime--;
            currentTime++;

            if (nextProcess.remainingTime === 0) {
                const waiting = currentTime - nextProcess.arrivalTime - nextProcess.burstTime;
                const turnaround = waiting + nextProcess.burstTime;
                waitingTime += waiting;
                turnaroundTime += turnaround;

                resultHTML += `<tr><td>P${nextProcess.id}</td><td>${nextProcess.arrivalTime}</td><td>${nextProcess.burstTime}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;

                remainingProcesses = remainingProcesses.filter(p => p.id !== nextProcess.id);
            }
        }
    }

    resultHTML += '</table>';
    resultHTML += `<p>Average Waiting Time: ${(waitingTime / processes.length).toFixed(2)}</p>`;
    resultHTML += `<p>Average Turnaround Time: ${(turnaroundTime / processes.length).toFixed(2)}</p>`;
    resultContainer.innerHTML = resultHTML;
}

// Round Robin Form
function loadRoundRobinForm(formContainer, resultContainer) {
    formContainer.innerHTML = `
        <h3>Round Robin Scheduling</h3>
        <form id="round-robin-form">
            <label for="processes">Enter number of processes:</label>
            <input type="number" id="processes" min="1" required>
            <label for="time-quantum">Time Quantum:</label>
            <input type="number" id="time-quantum" min="1" required>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('round-robin-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numProcesses = parseInt(document.getElementById('processes').value);
        const timeQuantum = parseInt(document.getElementById('time-quantum').value);
        loadProcessDetailsForm(numProcesses, resultContainer, (processes, resultContainer) => {
            calculateRoundRobin(processes, resultContainer, timeQuantum);
        });
    });
}

// Round Robin Calculation
function calculateRoundRobin(processes, resultContainer, timeQuantum) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let waitingTime = 0;
    let turnaroundTime = 0;
    let resultHTML = '<h3>Round Robin Results</h3><table border="1"><tr><th>Process</th><th>Arrival Time</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>';

    let remainingProcesses = processes.map(p => ({ ...p, remainingTime: p.burstTime }));

    while (remainingProcesses.length > 0) {
        for (let i = 0; i < remainingProcesses.length; i++) {
            const process = remainingProcesses[i];
            if (process.arrivalTime > currentTime) continue;

            const executionTime = Math.min(process.remainingTime, timeQuantum);
            process.remainingTime -= executionTime;
            currentTime += executionTime;

            if (process.remainingTime === 0) {
                const waiting = currentTime - process.arrivalTime - process.burstTime;
                const turnaround = waiting + process.burstTime;
                waitingTime += waiting;
                turnaroundTime += turnaround;

                resultHTML += `<tr><td>P${process.id}</td><td>${process.arrivalTime}</td><td>${process.burstTime}</td><td>${waiting}</td><td>${turnaround}</td></tr>`;

                remainingProcesses.splice(i, 1);
                i--;
            }
        }
    }

    resultHTML += '</table>';
    resultHTML += `<p>Average Waiting Time: ${(waitingTime / processes.length).toFixed(2)}</p>`;
    resultHTML += `<p>Average Turnaround Time: ${(turnaroundTime / processes.length).toFixed(2)}</p>`;
    resultContainer.innerHTML = resultHTML;
}

// Banker's Algorithm Form
function loadBankersForm(formContainer, resultContainer) {
    formContainer.innerHTML = `
        <h3>Banker's Algorithm</h3>
        <form id="bankers-form">
            <label for="num-processes">Number of Processes:</label>
            <input type="number" id="num-processes" min="1" required>
            <label for="num-resources">Number of Resources:</label>
            <input type="number" id="num-resources" min="1" required>
            <button type="submit">Next</button>
        </form>
    `;

    document.getElementById('bankers-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numProcesses = parseInt(document.getElementById('num-processes').value);
        const numResources = parseInt(document.getElementById('num-resources').value);
        loadBankersDetailsForm(numProcesses, numResources, resultContainer);
    });
}

// Banker's Algorithm Details Form
function loadBankersDetailsForm(numProcesses, numResources, resultContainer) {
    let formHTML = '<h3>Enter Banker\'s Algorithm Details</h3><form id="bankers-details-form">';

    // Input for Available Resources
    formHTML += '<h4>Available Resources</h4>';
    for (let i = 0; i < numResources; i++) {
        formHTML += `
            <label for="available-${i}">Resource ${i + 1}:</label>
            <input type="number" id="available-${i}" min="0" required>
        `;
    }

    // Input for Maximum Demand Matrix
    formHTML += '<h4>Maximum Demand Matrix</h4>';
    for (let i = 0; i < numProcesses; i++) {
        formHTML += `<h5>Process ${i + 1}</h5>`;
        for (let j = 0; j < numResources; j++) {
            formHTML += `
                <label for="max-demand-${i}-${j}">Resource ${j + 1}:</label>
                <input type="number" id="max-demand-${i}-${j}" min="0" required>
            `;
        }
    }

    // Input for Allocated Resources Matrix
    formHTML += '<h4>Allocated Resources Matrix</h4>';
    for (let i = 0; i < numProcesses; i++) {
        formHTML += `<h5>Process ${i + 1}</h5>`;
        for (let j = 0; j < numResources; j++) {
            formHTML += `
                <label for="allocated-${i}-${j}">Resource ${j + 1}:</label>
                <input type="number" id="allocated-${i}-${j}" min="0" required>
            `;
        }
    }

    formHTML += '<button type="submit">Calculate</button></form>';
    resultContainer.innerHTML = formHTML;

    document.getElementById('bankers-details-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Collect Available Resources
        const available = [];
        for (let i = 0; i < numResources; i++) {
            available.push(parseInt(document.getElementById(`available-${i}`).value));
        }

        // Collect Maximum Demand Matrix
        const maxDemand = [];
        for (let i = 0; i < numProcesses; i++) {
            const processDemand = [];
            for (let j = 0; j < numResources; j++) {
                processDemand.push(parseInt(document.getElementById(`max-demand-${i}-${j}`).value));
            }
            maxDemand.push(processDemand);
        }

        // Collect Allocated Resources Matrix
        const allocated = [];
        for (let i = 0; i < numProcesses; i++) {
            const processAllocated = [];
            for (let j = 0; j < numResources; j++) {
                processAllocated.push(parseInt(document.getElementById(`allocated-${i}-${j}`).value));
            }
            allocated.push(processAllocated);
        }

        // Calculate and Display Results
        const result = bankersAlgorithm(available, maxDemand, allocated, numProcesses, numResources);
        displayBankersResult(resultContainer, result);
    });
}

// Banker's Algorithm Implementation
function bankersAlgorithm(available, maxDemand, allocated, numProcesses, numResources) {
    // Calculate Need Matrix
    const need = [];
    for (let i = 0; i < numProcesses; i++) {
        const processNeed = [];
        for (let j = 0; j < numResources; j++) {
            processNeed.push(maxDemand[i][j] - allocated[i][j]);
        }
        need.push(processNeed);
    }

    // Initialize Work and Finish arrays
    const work = [...available];
    const finish = new Array(numProcesses).fill(false);
    const safeSequence = [];

    // Find a safe sequence
    while (true) {
        let found = false;
        for (let i = 0; i < numProcesses; i++) {
            if (!finish[i] && need[i].every((val, j) => val <= work[j])) {
                // Process can be executed
                for (let j = 0; j < numResources; j++) {
                    work[j] += allocated[i][j];
                }
                safeSequence.push(i);
                finish[i] = true;
                found = true;
            }
        }

        if (!found) break; // No more processes can be executed
    }

    // Check if all processes are finished
    const isSafe = finish.every(val => val);

    return {
        isSafe,
        safeSequence: isSafe ? safeSequence : null,
        need,
    };
}

// Display Banker's Algorithm Results
function displayBankersResult(resultContainer, result) {
    let resultHTML = '<h3>Banker\'s Algorithm Results</h3>';

    if (result.isSafe) {
        resultHTML += '<p>The system is in a <strong>safe state</strong>.</p>';
        resultHTML += `<p>Safe Sequence: ${result.safeSequence.map(p => `P${p + 1}`).join(' -> ')}</p>`;
    } else {
        resultHTML += '<p>The system is in an <strong>unsafe state</strong> (deadlock possible).</p>';
    }

    // Display Need Matrix
    resultHTML += '<h4>Need Matrix</h4><table border="1"><tr><th>Process</th>';
    for (let j = 0; j < result.need[0].length; j++) {
        resultHTML += `<th>Resource ${j + 1}</th>`;
    }
    resultHTML += '</tr>';
    for (let i = 0; i < result.need.length; i++) {
        resultHTML += `<tr><td>P${i + 1}</td>`;
        for (let j = 0; j < result.need[i].length; j++) {
            resultHTML += `<td>${result.need[i][j]}</td>`;
        }
        resultHTML += '</tr>';
    }
    resultHTML += '</table>';

    resultContainer.innerHTML = resultHTML;
}

// Disk Scheduling Form
function loadDiskSchedulingForm(formContainer, resultContainer, algorithm) {
    formContainer.innerHTML = `
        <h3>${algorithm.toUpperCase()} Disk Scheduling</h3>
        <form id="disk-scheduling-form">
            <label for="requests">Enter the number of disk requests:</label>
            <input type="number" id="requests" min="1" required>
            <label for="initial-position">Initial Head Position:</label>
            <input type="number" id="initial-position" min="0" required>
            <label for="disk-size">Disk Size (Max Cylinder):</label>
            <input type="number" id="disk-size" min="1" required>
            <button type="submit">Calculate</button>
        </form>
    `;

    document.getElementById('disk-scheduling-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const numRequests = parseInt(document.getElementById('requests').value);
        const initialPosition = parseInt(document.getElementById('initial-position').value);
        const diskSize = parseInt(document.getElementById('disk-size').value);
        loadDiskRequestsForm(numRequests, initialPosition, diskSize, resultContainer, algorithm);
    });
}

// Disk Requests Form
function loadDiskRequestsForm(numRequests, initialPosition, diskSize, resultContainer, algorithm) {
    let formHTML = '<h3>Enter Disk Requests</h3><form id="disk-requests-form">';
    for (let i = 1; i <= numRequests; i++) {
        formHTML += `
            <label for="request-${i}">Request ${i}:</label>
            <input type="number" id="request-${i}" min="0" max="${diskSize}" required>
        `;
    }
    formHTML += '<button type="submit">Calculate</button></form>';
    resultContainer.innerHTML = formHTML;

    document.getElementById('disk-requests-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const requests = [];
        for (let i = 1; i <= numRequests; i++) {
            requests.push(parseInt(document.getElementById(`request-${i}`).value));
        }
        calculateDiskScheduling(requests, initialPosition, diskSize, resultContainer, algorithm);
    });
}

// Disk Scheduling Calculation
function calculateDiskScheduling(requests, initialPosition, diskSize, resultContainer, algorithm) {
    let resultHTML = `<h3>${algorithm.toUpperCase()} Disk Scheduling Results</h3>`;
    let totalSeekTime = 0;
    let sequence = [];

    switch (algorithm) {
        case 'fcfs-disk':
            sequence = fcfsDiskScheduling(requests, initialPosition);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        case 'sstf':
            sequence = sstfDiskScheduling(requests, initialPosition);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        case 'scan':
            sequence = scanDiskScheduling(requests, initialPosition, diskSize);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        case 'cscan':
            sequence = cscanDiskScheduling(requests, initialPosition, diskSize);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        case 'look':
            sequence = lookDiskScheduling(requests, initialPosition);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        case 'clook':
            sequence = clookDiskScheduling(requests, initialPosition);
            totalSeekTime = calculateSeekTime(sequence, initialPosition);
            break;
        default:
            resultHTML += '<p>Invalid algorithm selected.</p>';
            resultContainer.innerHTML = resultHTML;
            return;
    }

    resultHTML += `<p>Sequence: ${sequence.join(' -> ')}</p>`;
    resultHTML += `<p>Total Seek Time: ${totalSeekTime}</p>`;
    resultContainer.innerHTML = resultHTML;
}

// FCFS Disk Scheduling
function fcfsDiskScheduling(requests, initialPosition) {
    return [initialPosition, ...requests];
}

// SSTF Disk Scheduling
function sstfDiskScheduling(requests, initialPosition) {
    let sequence = [initialPosition];
    let remainingRequests = [...requests];

    while (remainingRequests.length > 0) {
        let closestRequest = remainingRequests.reduce((prev, curr) =>
            Math.abs(curr - sequence[sequence.length - 1]) < Math.abs(prev - sequence[sequence.length - 1]) ? curr : prev
        );
        sequence.push(closestRequest);
        remainingRequests = remainingRequests.filter(req => req !== closestRequest);
    }

    return sequence;
}

// SCAN Disk Scheduling
function scanDiskScheduling(requests, initialPosition, diskSize) {
    let sequence = [initialPosition];
    let remainingRequests = [...requests];

    remainingRequests.sort((a, b) => a - b);

    // Move towards the end
    for (let i = initialPosition; i <= diskSize; i++) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }
    sequence.push(diskSize); // Reach the end

    // Move towards the start
    for (let i = diskSize - 1; i >= 0; i--) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }

    return sequence;
}

// CSCAN Disk Scheduling
function cscanDiskScheduling(requests, initialPosition, diskSize) {
    let sequence = [initialPosition];
    let remainingRequests = [...requests];

    remainingRequests.sort((a, b) => a - b);

    // Move towards the end
    for (let i = initialPosition; i <= diskSize; i++) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }
    sequence.push(diskSize); // Reach the end
    sequence.push(0); // Jump to the start

    // Move towards the end again
    for (let i = 0; i <= diskSize; i++) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }

    return sequence;
}

// LOOK Disk Scheduling
function lookDiskScheduling(requests, initialPosition) {
    let sequence = [initialPosition];
    let remainingRequests = [...requests];

    remainingRequests.sort((a, b) => a - b);

    // Move towards the highest request
    for (let i = initialPosition; i <= Math.max(...remainingRequests); i++) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }

    // Move towards the lowest request
    for (let i = Math.max(...remainingRequests); i >= Math.min(...remainingRequests); i--) {
        if (remainingRequests.includes(i)) {
            sequence.push(i);
            remainingRequests = remainingRequests.filter(req => req !== i);
        }
    }

    return sequence;
}