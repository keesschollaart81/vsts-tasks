import Q = require('q');
import fs = require('fs');
import trm = require('./toolrunner');
export declare enum TaskResult {
    Succeeded = 0,
    Failed = 1,
}
export declare function setStdStream(stdStream: any): void;
export declare function setErrStream(errStream: any): void;
/**
 * Sets the result of the task.
 * Execution will continue.
 * If not set, task will be Succeeded.
 * If multiple calls are made to setResult the most pessimistic call wins (Failed) regardless of the order of calls.
 *
 * @param result    TaskResult enum of Success or Failed.
 * @param message   A message which will be logged as an error issue if the result is Failed.
 * @returns         void
 */
export declare function setResult(result: TaskResult, message: string): void;
/**
 * Sets the location of the resources json.  This is typically the task.json file.
 * Call once at the beginning of the script before any calls to loc.
 *
 * @param     path      Full path to the json.
 * @returns   void
 */
export declare function setResourcePath(path: string): void;
/**
 * Gets the localized string from the json resource file.  Optionally formats with additional params.
 *
 * @param     key      key of the resources string in the resource file
 * @param     param    additional params for formatting the string
 * @returns   string
 */
export declare function loc(key: string, ...param: any[]): string;
/**
 * Gets a variable value that is defined on the build/release definition or set at runtime.
 *
 * @param     name     name of the variable to get
 * @returns   string
 */
export declare function getVariable(name: string): string;
/**
 * Gets a snapshot of the current state of all job variables available to the task.
 * Requires a 2.104.1 agent or higher for full functionality.
 *
 * Limitations on an agent prior to 2.104.1:
 *  1) The return value does not include all public variables. Only public variables
 *     that have been added using setVariable are returned.
 *  2) The name returned for each secret variable is the formatted environment variable
 *     name, not the actual variable name (unless it was set explicitly at runtime using
 *     setVariable).
 *
 * @returns VariableInfo[]
 */
export declare function getVariables(): VariableInfo[];
/**
 * Sets a variable which will be available to subsequent tasks as well.
 *
 * @param     name    name of the variable to set
 * @param     val     value to set
 * @param     secret  whether variable is secret.  optional, defaults to false
 * @returns   void
 */
export declare function setVariable(name: string, val: string, secret?: boolean): void;
/** Snapshot of a variable at the time when getVariables was called. */
export interface VariableInfo {
    name: string;
    value: string;
    secret: boolean;
}
/**
 * Gets the value of an input.  The value is also trimmed.
 * If required is true and the value is not set, it will throw.
 *
 * @param     name     name of the input to get
 * @param     required whether input is required.  optional, defaults to false
 * @returns   string
 */
export declare function getInput(name: string, required?: boolean): string;
/**
 * Gets the value of an input and converts to a bool.  Convenience.
 * If required is true and the value is not set, it will throw.
 *
 * @param     name     name of the bool input to get
 * @param     required whether input is required.  optional, defaults to false
 * @returns   string
 */
export declare function getBoolInput(name: string, required?: boolean): boolean;
/**
 * Gets the value of an input and splits the value using a delimiter (space, comma, etc).
 * Empty values are removed.  This function is useful for splitting an input containing a simple
 * list of items - such as build targets.
 * IMPORTANT: Do not use this function for splitting additional args!  Instead use argString(), which
 * follows normal argument splitting rules and handles values encapsulated by quotes.
 * If required is true and the value is not set, it will throw.
 *
 * @param     name     name of the input to get
 * @param     delim    delimiter to split on
 * @param     required whether input is required.  optional, defaults to false
 * @returns   string[]
 */
export declare function getDelimitedInput(name: string, delim: string, required?: boolean): string[];
/**
 * Checks whether a path inputs value was supplied by the user
 * File paths are relative with a picker, so an empty path is the root of the repo.
 * Useful if you need to condition work (like append an arg) if a value was supplied
 *
 * @param     name      name of the path input to check
 * @returns   boolean
 */
export declare function filePathSupplied(name: string): boolean;
/**
 * Gets the value of a path input
 * It will be quoted for you if it isn't already and contains spaces
 * If required is true and the value is not set, it will throw.
 * If check is true and the path does not exist, it will throw.
 *
 * @param     name      name of the input to get
 * @param     required  whether input is required.  optional, defaults to false
 * @param     check     whether path is checked.  optional, defaults to false
 * @returns   string
 */
export declare function getPathInput(name: string, required?: boolean, check?: boolean): string;
/**
 * Gets the url for a service endpoint
 * If the url was not set and is not optional, it will throw.
 *
 * @param     id        name of the service endpoint
 * @param     optional  whether the url is optional
 * @returns   string
 */
export declare function getEndpointUrl(id: string, optional: boolean): string;
export declare function getEndpointDataParameter(id: string, key: string, optional: boolean): string;
/**
 * Gets the endpoint authorization scheme for a service endpoint
 * If the endpoint authorization scheme is not set and is not optional, it will throw.
 *
 * @param id name of the service endpoint
 * @param optional whether the endpoint authorization scheme is optional
 * @returns {string} value of the endpoint authorization scheme
 */
export declare function getEndpointAuthorizationScheme(id: string, optional: boolean): string;
/**
 * Gets the endpoint authorization parameter value for a service endpoint with specified key
 * If the endpoint authorization parameter is not set and is not optional, it will throw.
 *
 * @param id name of the service endpoint
 * @param key key to find the endpoint authorization parameter
 * @param optional optional whether the endpoint authorization scheme is optional
 * @returns {string} value of the endpoint authorization parameter value
 */
export declare function getEndpointAuthorizationParameter(id: string, key: string, optional: boolean): string;
/**
 * Interface for EndpointAuthorization
 * Contains a schema and a string/string dictionary of auth data
 */
export interface EndpointAuthorization {
    /** dictionary of auth data */
    parameters: {
        [key: string]: string;
    };
    /** auth scheme such as OAuth or username/password etc... */
    scheme: string;
}
/**
 * Gets the authorization details for a service endpoint
 * If the authorization was not set and is not optional, it will throw.
 *
 * @param     id        name of the service endpoint
 * @param     optional  whether the url is optional
 * @returns   string
 */
export declare function getEndpointAuthorization(id: string, optional: boolean): EndpointAuthorization;
export declare function command(command: string, properties: any, message: string): void;
export declare function warning(message: string): void;
export declare function error(message: string): void;
export declare function debug(message: string): void;
export interface FsStats extends fs.Stats {
}
/**
 * Get's stat on a path.
 * Useful for checking whether a file or directory.  Also getting created, modified and accessed time.
 * see [fs.stat](https://nodejs.org/api/fs.html#fs_class_fs_stats)
 *
 * @param     path      path to check
 * @returns   fsStat
 */
export declare function stats(path: string): FsStats;
/**
 * Returns whether a path exists.
 *
 * @param     path      path to check
 * @returns   boolean
 */
export declare function exist(path: string): boolean;
export interface FsOptions {
    encoding?: string;
    mode?: number;
    flag?: string;
}
export declare function writeFile(file: string, data: string | Buffer, options?: string | FsOptions): void;
/**
 * Useful for determining the host operating system.
 * see [os.type](https://nodejs.org/api/os.html#os_os_type)
 *
 * @return      the name of the operating system
 */
export declare function osType(): string;
/**
 * Returns the process's current working directory.
 * see [process.cwd](https://nodejs.org/api/process.html#process_process_cwd)
 *
 * @return      the path to the current working directory of the process
 */
export declare function cwd(): string;
/**
 * Checks whether a path exists.
 * If the path does not exist, it will throw.
 *
 * @param     p         path to check
 * @param     name      name only used in error message to identify the path
 * @returns   void
 */
export declare function checkPath(p: string, name: string): void;
/**
 * Change working directory.
 *
 * @param     path      new working directory path
 * @returns   void
 */
export declare function cd(path: string): void;
/**
 * Change working directory and push it on the stack
 *
 * @param     path      new working directory path
 * @returns   void
 */
export declare function pushd(path: string): void;
/**
 * Change working directory back to previously pushed directory
 *
 * @returns   void
 */
export declare function popd(): void;
/**
 * Make a directory.  Creates the full path with folders in between
 * Will throw if it fails
 *
 * @param     p       path to create
 * @returns   void
 */
export declare function mkdirP(p: string): void;
/**
 * Resolves a sequence of paths or path segments into an absolute path.
 * Calls node.js path.resolve()
 * Allows L0 testing with consistent path formats on Mac/Linux and Windows in the mock implementation
 * @param pathSegments
 * @returns {string}
 */
export declare function resolve(...pathSegments: any[]): string;
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 *
 * @param     tool       name of the tool
 * @param     check      whether to check if tool exists
 * @returns   string
 */
export declare function which(tool: string, check?: boolean): string;
/**
 * Returns array of files in the given path, or in current directory if no path provided.  See shelljs.ls
 * @param  {string}   options  Available options: -R (recursive), -A (all files, include files beginning with ., except for . and ..)
 * @param  {string[]} paths    Paths to search.
 * @return {string[]}          An array of files in the given path(s).
 */
export declare function ls(options: string, paths: string[]): string[];
/**
 * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
 * If you check and the tool does not exist, it will throw.
 * Returns whether the copy was successful
 *
 * @param     source     source path
 * @param     dest       destination path
 * @param     options    string -r, -f or -rf for recursive and force
 * @param     continueOnError optional. whether to continue on error
 */
export declare function cp(source: string, dest: string, options?: string, continueOnError?: boolean): void;
/**
 * Moves a path.
 * Returns whether the copy was successful
 *
 * @param     source     source path
 * @param     dest       destination path
 * @param     options    string -f or -n for force and no clobber
 * @param     continueOnError optional. whether to continue on error
 */
export declare function mv(source: string, dest: string, options?: string, continueOnError?: boolean): void;
/**
 * Interface for FindOptions
 * Contains properties to control whether to follow symlinks
 */
export interface FindOptions {
    /**
     * Equivalent to the -H command line option. Indicates whether to traverse descendants if
     * the specified path is a symbolic link directory. Does not cause nested symbolic link
     * directories to be traversed.
     */
    followSpecifiedSymbolicLink: boolean;
    /**
     * Equivalent to the -L command line option. Indicates whether to traverse descendants of
     * symbolic link directories.
     */
    followSymbolicLinks: boolean;
}
/**
 * Recursively finds all paths a given path. Returns an array of paths.
 *
 * @param     findPath  path to search
 * @param     options   optional. defaults to { followSymbolicLinks: true }. following soft links is generally appropriate unless deleting files.
 * @returns   string[]
 */
export declare function find(findPath: string, options?: FindOptions): string[];
/**
 * Prefer tl.find() and tl.match() instead. This function is for backward compatibility
 * when porting tasks to Node from the PowerShell or PowerShell3 execution handler.
 *
 * @param    rootDirectory      path to root unrooted patterns with
 * @param    pattern            include and exclude patterns
 * @param    includeFiles       whether to include files in the result. defaults to true when includeFiles and includeDirectories are both false
 * @param    includeDirectories whether to include directories in the result
 * @returns  string[]
 */
export declare function legacyFindFiles(rootDirectory: string, pattern: string, includeFiles?: boolean, includeDirectories?: boolean): string[];
/**
 * Remove a path recursively with force
 * Returns whether it succeeds
 *
 * @param     path     path to remove
 * @param     continueOnError optional. whether to continue on error
 * @returns   void
 */
export declare function rmRF(path: string, continueOnError?: boolean): void;
/**
 * Exec a tool.  Convenience wrapper over ToolRunner to exec with args in one call.
 * Output will be streamed to the live console.
 * Returns promise with return code
 *
 * @param     tool     path to tool to exec
 * @param     args     an arg string or array of args
 * @param     options  optional exec options.  See IExecOptions
 * @returns   number
 */
export declare function exec(tool: string, args: any, options?: trm.IExecOptions): Q.Promise<number>;
/**
 * Exec a tool synchronously.  Convenience wrapper over ToolRunner to execSync with args in one call.
 * Output will be *not* be streamed to the live console.  It will be returned after execution is complete.
 * Appropriate for short running tools
 * Returns IExecResult with output and return code
 *
 * @param     tool     path to tool to exec
 * @param     args     an arg string or array of args
 * @param     options  optionalexec options.  See IExecOptions
 * @returns   IExecResult
 */
export declare function execSync(tool: string, args: string | string[], options?: trm.IExecOptions): trm.IExecResult;
/**
 * Convenience factory to create a ToolRunner.
 *
 * @param     tool     path to tool to exec
 * @returns   ToolRunner
 */
export declare function tool(tool: string): trm.ToolRunner;
export interface MatchOptions {
    debug?: boolean;
    nobrace?: boolean;
    noglobstar?: boolean;
    dot?: boolean;
    noext?: boolean;
    nocase?: boolean;
    nonull?: boolean;
    matchBase?: boolean;
    nocomment?: boolean;
    nonegate?: boolean;
    flipNegate?: boolean;
}
/**
 * Applies glob patterns to a list of paths. Supports interleaved exclude patterns.
 *
 * @param  list         array of paths
 * @param  patterns     patterns to apply. supports interleaved exclude patterns.
 * @param  patternRoot  optional. default root to apply to unrooted patterns. not applied to basename-only patterns when matchBase:true.
 * @param  options      optional. defaults to { dot: true, nobrace: true, nocase: process.platform == 'win32' }.
 */
export declare function match(list: string[], patterns: string[] | string, patternRoot?: string, options?: MatchOptions): string[];
/**
 * Filter to apply glob patterns
 *
 * @param  pattern  pattern to apply
 * @param  options  optional. defaults to { dot: true, nobrace: true, nocase: process.platform == 'win32' }.
 */
export declare function filter(pattern: string, options?: MatchOptions): (element: string, indexed: number, array: string[]) => boolean;
/**
 * Determines the find root from a list of patterns. Performs the find and then applies the glob patterns.
 * Supports interleaved exclude patterns. Unrooted patterns are rooted using defaultRoot, unless
 * matchOptions.matchBase is specified and the pattern is a basename only. For matchBase cases, the
 * defaultRoot is used as the find root.
 *
 * @param  defaultRoot   default path to root unrooted patterns. falls back to System.DefaultWorkingDirectory or process.cwd().
 * @param  patterns      pattern or array of patterns to apply
 * @param  findOptions   defaults to { followSymbolicLinks: true }. following soft links is generally appropriate unless deleting files.
 * @param  matchOptions  defaults to { dot: true, nobrace: true, nocase: process.platform == 'win32' }
 */
export declare function findMatch(defaultRoot: string, patterns: string[] | string, findOptions?: FindOptions, matchOptions?: MatchOptions): string[];
export declare class TestPublisher {
    constructor(testRunner: any);
    testRunner: string;
    publish(resultFiles: any, mergeResults: any, platform: any, config: any, runTitle: any, publishRunAttachments: any): void;
}
export declare class CodeCoveragePublisher {
    constructor();
    publish(codeCoverageTool: any, summaryFileLocation: any, reportDirectory: any, additionalCodeCoverageFiles: any): void;
}
export declare class CodeCoverageEnabler {
    private buildTool;
    private ccTool;
    constructor(buildTool: string, ccTool: string);
    enableCodeCoverage(buildProps: {
        [key: string]: string;
    }): void;
}
