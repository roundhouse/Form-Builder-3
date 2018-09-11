<?php
/**
 * Form Builder plugin for Craft CMS 3.x
 *
 * Craft CMS plugin that lets you create and manage forms for your front-end.
 *
 * @link      https://roundhouseagency.com
 * @copyright Copyright (c) 2018 Roundhouse Agency (roundhousepdx)
 */

namespace roundhouse\formbuilder\controllers;

use Craft;
use craft\web\Controller;
use craft\helpers\FileHelper;
use craft\helpers\Path;

use yii\web\Response;
use yii\web\NotFoundHttpException;

use ZipArchive;

class AssetsController extends Controller
{
    protected $allowAnonymous = false;

    /**
     * Download all entry assets
     *
     * @return Response
     * @throws NotFoundHttpException
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionDownloadAllFiles()
    {
        $this->requirePermission('fb:downloadFiles');

        $this->requireAcceptsJson();

        $params = Craft::$app->getRequest()->getRequiredBodyParam('params');
        $assets = [];

        if (empty($params['assets'])) {
            return $this->asJson(['success' => true]);
        }

        foreach ($params['assets'] as $id => $value) {
            $assets[] = Craft::$app->assets->getAssetById($id);
        }

        $zipPath = Craft::$app->getPath()->getTempPath().DIRECTORY_SEPARATOR.'assets-'.pathinfo($params['entryId'], PATHINFO_FILENAME).'.zip';
        $validatePath = Path::ensurePathIsContained($zipPath);

        if (is_file($zipPath)) {
            try {
                FileHelper::unlink($zipPath);
            } catch (ErrorException $e) {
                Craft::warning("Unable to download the file \"{$zipPath}\": ".$e->getMessage(), __METHOD__);
            }
        }

        if (!$validatePath) {
            throw new NotFoundHttpException(Craft::t('form-builder', 'Invalid filename or location: {filename}', [
                'filename' => $zipPath
            ]));
        }

        $zip = new ZipArchive();

        if ($zip->open($zipPath, ZipArchive::CREATE) !== true) {
            throw new Exception('Cannot create zip at '.$zipPath);
        }

        foreach ($assets as $asset) {
            $zip->addFromString($asset->filename, file_get_contents($asset->url));
        }

        $filePath = $zip->filename;
        $zip->close();

        return $this->asJson([
            'downloadFile' => $filePath
        ]);
    }

    /**
     * Download zip file
     *
     * @return Response
     * @throws \yii\web\BadRequestHttpException
     * @throws \yii\web\ForbiddenHttpException
     */
    public function actionDownloadFile(): Response
    {
        $this->requirePermission('fb:downloadFiles');
        $filePath = Craft::$app->getRequest()->getRequiredQueryParam('filename');

        $validate = Path::ensurePathIsContained($filePath);

        if ($validate) {
            return Craft::$app->getResponse()->sendFile($filePath);
        } else {
            false;
        }
    }
}
