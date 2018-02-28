import {isNullOrUndefined} from "util";

export class CameraRunStatus{
  last_monitor_time: Date;
  public constructor(last_monitor_time?: Date){
    this.last_monitor_time = last_monitor_time;
  }
}
export class Camera {
  id: string;
  running: boolean;
  camera_id: string;
  runtime_directory: string;
  country_code: string;
  default_region: string;
  config_file_name: string;
  camera_url: string;
  motion_threshold: number;
  prewarp: string;
  no_motion_sleep_time: number;
  confidence_threshold: number;
  max_plate_angle_degrees: number;
  contrast_detection_threshold: number;
  analysis_count: number;
  max_detection_input_height: number;
  max_detection_input_width: number;
  detection_strictness: number;
  detection_iteration_increase: number;
  max_plate_height_percent: number;
  max_plate_width_percent: number;
  detection_mode_count: number;
  motion_mode_count: number;
  update_status_interval: number;
  run_status: Object;

  public constructor(camera_id?: string, running?: boolean, run_status?: Object,
                     id?: string, runtime_directory: string = '/usr/share/openalpr/runtime_data',
                     country_code: string = 'us', default_region: string = 'wa',
                     config_file_name: string = 'cam-conf', camera_url?: string,
                     motion_threshold: number = 0.035, prewarp?: string, no_motion_sleep_time: number = 1500,
                     confidence_threshold: number = 81, max_plate_angle_degrees: number = 15,
                     contrast_detection_threshold: number = 0.3, analysis_count: number = 1,
                     max_detection_input_height: number = 1080, max_detection_input_width: number = 1920,
                     detection_strictness: number = 2, detection_iteration_increase: number = 1.1,
                     max_plate_height_percent: number = 20, max_plate_width_percent: number = 20,
                     detection_mode_count: number = 5, motion_mode_count: number = 5,
                     update_status_interval: number = 10) {
    this.camera_id = camera_id;
    this.running = running;
    this.id = id;
    this.runtime_directory = runtime_directory;
    this.country_code = country_code;
    this.default_region = default_region;
    this.config_file_name = config_file_name;
    this.camera_url = camera_url;
    this.motion_threshold = motion_threshold;
    this.prewarp = prewarp;
    this.no_motion_sleep_time = no_motion_sleep_time;
    this.confidence_threshold = confidence_threshold;
    this.max_plate_angle_degrees = max_plate_angle_degrees;
    this.contrast_detection_threshold = contrast_detection_threshold;
    this.analysis_count = analysis_count;
    this.max_detection_input_height = max_detection_input_height;
    this.max_detection_input_width = max_detection_input_width;
    this.detection_strictness = detection_strictness;
    this.detection_iteration_increase = detection_iteration_increase;
    this.max_plate_height_percent = max_plate_height_percent;
    this.max_plate_width_percent = max_plate_width_percent;
    this.detection_mode_count = detection_mode_count;
    this.motion_mode_count = motion_mode_count;
    this.update_status_interval = update_status_interval;
    if (!isNullOrUndefined(run_status) && 'last_monitor_time' in run_status) {
      this.run_status = new CameraRunStatus(run_status['last_monitor_time']);
    } else {
      this.run_status = new CameraRunStatus(null);
    }
  }
}
